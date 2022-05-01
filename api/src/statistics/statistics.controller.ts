import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { CreateStatisticDto } from "./dto/create-statistic.dto";
import { UpdateStatisticDto } from "./dto/update-statistic.dto";
import { get } from "http";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post()
  getStatistics(@Body("character_id") character_id: string, @Body("promotionId") promotionId: string) {
    console.log(character_id, promotionId);
    return this.statisticsService.getStatistics(character_id, promotionId);
  }
}
