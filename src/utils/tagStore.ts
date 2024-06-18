import { Bee } from '@ethersphere/bee-js';
import { Wallet } from 'ethers';

export class Store {
    private wallet: Wallet;
    private stamp: string;
    private bee: Bee;

    constructor(privateKey: string, stamp: string, beeApiUrl: string) {
        this.wallet = new Wallet(privateKey);
        this.stamp = stamp;
        this.bee = new Bee(beeApiUrl);
    }

    async initialize(): Promise<string> {
        const manifest = await this.bee.createFeedManifest(this.stamp, 'sequence', '0'.repeat(64), this.wallet.address);
        const writer = await this.bee.makeFeedWriter('sequence', '0'.repeat(64), this.wallet.privateKey);
        const uploadResults = await this.bee.uploadData(this.stamp, JSON.stringify({}));
        await writer.upload(this.stamp, uploadResults.reference, { index: 0 });
        return manifest.reference
    }

    async getAll(): Promise<Record<string, string[]>> {
        const feedReader = this.bee.makeFeedReader('sequence', '0'.repeat(64), this.wallet.address);
        const feedDownloadResults = await feedReader.download();
        console.log({ feedDownloadResults });
        const data = await this.bee.downloadData(feedDownloadResults.reference);
        console.log('downloaded', data.text());
        return JSON.parse(data.text());
    }

    async append(key: string, value: string): Promise<string> {
        const feedWriter = this.bee.makeFeedWriter('sequence', '0'.repeat(64), this.wallet.privateKey);
        const data = await this.getAll();
        if (data[key]) {
            data[key].push(value);
        } else {
            data[key] = [value];
        }
        const uploadResults = await this.bee.uploadData(this.stamp, JSON.stringify(data));
        const results = await feedWriter.upload(this.stamp, uploadResults.reference);
        return results;
    }
}