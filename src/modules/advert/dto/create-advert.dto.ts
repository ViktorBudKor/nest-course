import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdvertDto {
  @ApiProperty({ description: 'Street of garage' })
  @IsString()
  street: string;
  @ApiProperty({ description: 'Number of spaces in garage' })
  @IsNumber()
  numberOfSpaces: number;
  @ApiProperty({ description: 'Price of garage' })
  @IsNumber()
  price: number;
  @ApiProperty({
    description:
      '1 - Проведено электричество, 2 - Яма для автомобиля, 3 - Проведена вода, 4 - Верстак',
    default: [1, 2, 3, 4],
  })
  @IsNumber({}, { each: true })
  equipment: number[];
}
// owner: Profile;
// @Column()
// street: string;
// @Column()
// numberOfSpaces: number;
// @Column()
// price: number;
// @Column()
// isPublished: boolean;
// @ManyToOne(() => Status, (status) => status.id, { eager: true })
// @JoinColumn()
// status: Status;
// @ManyToMany(() => Equipment, (equipment) => equipment.id, { eager: true })
// @JoinColumn()
// equipment: Equipment[];
// }
