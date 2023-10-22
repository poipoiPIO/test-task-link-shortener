import { IUserHistoryItem } from '../../models/UserHistoryItem';

class ResponseUserHistoryItem {
    shortenedLink: string;
    originResource: string;

    constructor(shortenedLink: string, originResource: string) {
        this.shortenedLink = shortenedLink;
        this.originResource = originResource;
    }

    static fromUserHistoryItemFactory(item: IUserHistoryItem): ResponseUserHistoryItem {
        return new ResponseUserHistoryItem(process.env.SERVICE_BASE_URL + item.shortLinkKey, item.originalURI);
    }
}

export default ResponseUserHistoryItem;
