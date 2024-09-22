import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../page-meta-dto-parameters/page-meta-dto-parameters';

export class PageMetaDto {
  @ApiProperty()
  readonly currentPage: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.currentPage = pageOptionsDto.currentPage;
    this.pageSize = pageOptionsDto.pageSize;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
  }
}
