class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.refs = [];
    }
}

export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word, ref) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.refs.push(ref);
    }

    contains(word) {
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            let char = word[i];

            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        let node = this.root;
        for (let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this._collectRefs(node);
    }

    query(queryWords) {
        let results = null;
        for (let word of queryWords) {
            let wordResults = new Set(this.startsWith(word));
            console.log(`Found ${wordResults.length} results for '${word}'`);

            if (results === null) {
                results = wordResults;
            } else {
                results = new Set([...results].filter(x => wordResults.has(x)));
            }
            console.log(`Total results ${results.size} after '${word}'`);
        }

        return Array.from(results);
    }

    _collectRefs(node) {
        let refs = [];
        if (node.isEndOfWord) {
            refs = refs.concat(node.refs);
        }
        for (const child of Object.values(node.children)) {
            refs = refs.concat(this._collectRefs(child));
        }
        return refs;
    }

    delete(word, ref) {
        this._delete(this.root, word, 0, ref);
    }

    _delete(node, word, index, ref) {
        if (index === word.length) {
            // When end of word is reached only delete if current.endOfWord is true.
            if (!node.isEndOfWord) return false;

            // If the word has references, remove the specific reference
            if (node.refs.includes(ref)) {
                node.refs = node.refs.filter(r => r !== ref);
            }

            // If no references left, mark current node as non end of word
            if (node.refs.length === 0) {
                node.isEndOfWord = false;
            }

            // If current node doesn't have any child nodes, delete it from parent.
            return Object.keys(node.children).length === 0;
        }

        const ch = word[index];
        const childNode = node.children[ch];

        // If word is not found, return false
        if (childNode === undefined) return false;

        const shouldDeleteCurrentNode = this._delete(childNode, word, index + 1, ref);

        // If true is returned then delete the edge.
        if (shouldDeleteCurrentNode) {
            delete node.children[ch];
            // If current node doesn't have any child nodes, delete it from parent.
            return Object.keys(node.children).length === 0;
        }
        return false;
    }
}
