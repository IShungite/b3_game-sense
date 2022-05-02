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
  getStatistics(@Body("characterId") characterId: string, @Body("promotionId") promotionId: string) {
    return this.statisticsService.getStatistics(characterId, promotionId);
  }
}
