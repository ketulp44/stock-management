import { LoginDTO } from './../dtos/login.dto';
import { Controller, Post, Body } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";

@Controller('account')
export class AuthenticationController {
    constructor(private readonly authService : AuthenticationService) {}


    @Post('login')
    public async Login(@Body() loginInfo:LoginDTO) {
        return await this.authService.Login(loginInfo);
    }
}