export class InwardStockDTO {
  InwardStockId: number;
  SupplierId: number;
  CommodityId: number;
  CommodityName : string;
  SubCommodityId: number;
  SubCommodityName:string
  ProcessType: string;
  QualityType: string;
  PackageSize: number;
  PackageUnit: string;
  NoOfBags: number;
  StockLocation: string;
  StockPrice: number;
  IncomingDate: Date;
  IsActive: number;
}

