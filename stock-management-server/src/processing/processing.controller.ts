import { Controller, Get } from '@nestjs/common';
import { ProcessingService } from './processing.service';

@Controller('processing')
export class ProcessingController {

    constructor(
        private readonly processingService: ProcessingService
    ){}
    @Get('/all')
    public async getStockInProcessing() {
        return await this.processingService.getStockInProcessing();
    }


}
