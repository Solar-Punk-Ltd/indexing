import { Bee } from '@ethersphere/bee-js';
import { Wallet } from 'ethers';

const TOPIC = '0'.repeat(64);

export class IndexStore {
    private wallet: Wallet;
    private stamp: string;
    private bee: Bee;

    constructor(privateKey: string, stamp: string, beeApiUrl: string) {
        this.wallet = new Wallet(privateKey);
        this.stamp = stamp;
        this.bee = new Bee(beeApiUrl);
    }

    async initialize(): Promise<string | null> {
        try {
            const manifest = await this.bee.createFeedManifest(this.stamp, 'sequence', TOPIC, this.wallet.address);
            const writer = this.bee.makeFeedWriter('sequence', TOPIC, this.wallet.privateKey);
            const uploadResults = await this.bee.uploadData(this.stamp, JSON.stringify({}));
            await writer.upload(this.stamp, uploadResults.reference, { index: 0 });
    
            return manifest.reference;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async get(): Promise<object> {
        try {
            const feedReader = this.bee.makeFeedReader('sequence', TOPIC, this.wallet.address);
            const feedDownloadResults = await feedReader.download();
            const data = await this.bee.downloadData(feedDownloadResults.reference);
    
            return JSON.parse(data.text());
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async set(data: object): Promise<boolean> {
        try {
            const feedWriter = this.bee.makeFeedWriter('sequence', TOPIC, this.wallet.privateKey);
            const uploadResults = await this.bee.uploadData(this.stamp, JSON.stringify(data));
            await feedWriter.upload(this.stamp, uploadResults.reference);
    
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}