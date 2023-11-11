import { PrismaClient } from '@prisma/client';
import { PaymentMethodEnum } from '../src/types/payment-method.enum';
import { PurchaseTypeEnum } from '../src/types/purchase-type.enum';

export async function fillPurchases(prisma: PrismaClient) {
  await prisma.purchase.upsert({                                //1 Маша
    where: { id: '7e2d0660-1b41-4596-9b0e-8f9250419181' },
    update: {},
    create: {
      id: '7e2d0660-1b41-4596-9b0e-8f9250419181',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442',
      purchaseType: PurchaseTypeEnum.SEASON_TICKET,
      trainingId: 'af430d39-5608-4815-9de9-ff43be0c6936',
      price: 2400,
      quantity: 3,
      totalPrice: 7200,
      paymentMethod: PaymentMethodEnum.MIR,
      createdAt: new Date(),
    }
  });

  await prisma.purchase.upsert({                                //2 Маша
    where: { id: 'cdbf4100-48d6-4f2b-a454-bbe1562510e6' },
    update: {},
    create: {
      id: 'cdbf4100-48d6-4f2b-a454-bbe1562510e6',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442',
      purchaseType: PurchaseTypeEnum.SEASON_TICKET,
      trainingId: '18237a96-aac0-49af-9309-6b4e3f881109',
      price: 2400,
      quantity: 1,
      totalPrice: 2400,
      paymentMethod: PaymentMethodEnum.MIR,
      createdAt: new Date(),
    }
  });

  await prisma.purchase.upsert({                                //3 Анна
    where: { id: '5bf23699-f84b-468b-9625-20bbabd1a620' },
    update: {},
    create: {
      id: '5bf23699-f84b-468b-9625-20bbabd1a620',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5449',
      purchaseType: PurchaseTypeEnum.SEASON_TICKET,
      trainingId: '18237a96-aac0-49af-9309-6b4e3f881109',
      price: 2400,
      quantity: 2,
      totalPrice: 4800,
      paymentMethod: PaymentMethodEnum.MIR,
      createdAt: new Date(),
    }
  });

  await prisma.purchase.upsert({                                //4 Сергей
    where: { id: '1a0c1c96-88b2-41fa-961d-f8b1a13012cf' },
    update: {},
    create: {
      id: '1a0c1c96-88b2-41fa-961d-f8b1a13012cf',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5447',
      purchaseType: PurchaseTypeEnum.SEASON_TICKET,
      trainingId: 'a7119df3-c77a-4994-9621-739a7356b122',
      price: 3000,
      quantity: 5,
      totalPrice: 12000,
      paymentMethod: PaymentMethodEnum.MIR,
      createdAt: new Date(),
    }
  });
}
