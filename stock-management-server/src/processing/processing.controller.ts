import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { MarkAsProcessedDto } from 'src/dtos/mark-as-processed.dto';

@Controller('processing')
export class ProcessingController {

    constructor(
        private readonly processingService: ProcessingService
    ){}
    @Get('/all')
    public async getStockInProcessing() {
        return await this.processingService.getStockInProcessing();
    }

    @Post('markprocessed')
    public async markStockAsProcessed(@Body() details : MarkAsProcessedDto) {
        return await this.processingService.MarkAsProcessed(details);
    }


}
