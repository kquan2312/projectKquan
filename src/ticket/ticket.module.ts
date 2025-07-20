import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ElectronicItem } from '../electronic-item/entities/electronic-item.schema';
import { ElectronicItemSchema } from '../electronic-item/entities/electronic-item.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Ticket, TicketSchema } from './entities/ticket.schema';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: User.name, schema: UserSchema },
      {
        name: ElectronicItem.name,
        schema: ElectronicItemSchema,
      },
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
