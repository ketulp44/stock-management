export class MarkAsProcessedDto{
    commodity : { id:number; commodityName: String};
    qualityWiseWeight: {price:number; qualityType:string; weight:number} [];
    subCommodity: {CommodityId:number;id:number;subCommodityName:String};
    processingIds: number [];

}