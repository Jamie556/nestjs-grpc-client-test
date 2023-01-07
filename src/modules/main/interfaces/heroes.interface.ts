import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";
import { Hero } from "./hero.interface";

export interface HeroService {
  findOne(data: { id: number }, metaData: Metadata): Promise<Hero>;
}