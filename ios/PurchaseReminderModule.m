//
//  PurchaseReminderModule.m
//  productsApp
//
//  Created by Vinicius  Santos on 01/10/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(PurchaseReminder, NSObject)

RCT_EXTERN_METHOD(addPurchaseInCalendar: (NSString*)product purchaseReminderDate: (NSString*)purchaseReminderDate);

@end
