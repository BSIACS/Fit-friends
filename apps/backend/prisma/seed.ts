import { PrismaClient } from '@prisma/client';
import { fillNotifications } from './fill-notifications';
import { fillUsers } from './fill-users';
import { fillTrainers } from './fill-trainers';
import { fillTrainings } from './fill-trainnings';
import { fillPurchases } from './fill-purchases';


const prisma = new PrismaClient();

async function fillDb() {
  await fillUsers(prisma);
  await fillTrainers(prisma);
  await fillTrainings(prisma);
  await fillPurchases(prisma);
  await fillNotifications(prisma);

  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
