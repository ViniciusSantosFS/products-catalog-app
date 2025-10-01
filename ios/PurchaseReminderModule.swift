import Foundation
import EventKit

@objc(PurchaseReminder)
class PurchaseReminder: RCTEventEmitter {
  let eventStore = EKEventStore()
  
  enum BridgeEvents: String {
    case onSuccess, onError
  }
  
  @objc(addInCalendar: purchaseReminderDate:)
  func addInCalendar(_ product: String, _ purchaseReminderDate: String) {
    self.requestCalendarAccess() { (granted, error) in
      if (error != nil) {
        return self.onError("Ops something went wrong, try again later!")
      };
      
      if(granted == false) {
        return self.onError("Allow the app to access your calendar to continue")
      };
      
      let event = EKEvent(eventStore: self.eventStore)
      guard let eventDate = DateFormatter().getDateFromString(purchaseReminderDate) else {
        return self.onError("Ops something went wrong, try again later!")
      }
      
      event.title = "Purchase \(product) Reminder"
      event.startDate = eventDate
      event.endDate = eventDate
      event.isAllDay = true
      event.calendar = self.eventStore.defaultCalendarForNewEvents

      do {
        try self.eventStore.save(event, span: .thisEvent)
        self.onSuccess()
      } catch let error as NSError {
        self.onError(error.description)
      }
    }
  }
  
  private func requestCalendarAccess(completion: @escaping (Bool, (any Error)?) -> Void) {
    if #available(iOS 17.0, *) {
      self.eventStore.requestWriteOnlyAccessToEvents(completion: completion)
    } else {
      self.eventStore.requestAccess(to: .event, completion: completion)
    }
  }
  
  private func onSuccess() {
    sendEvent(withName: BridgeEvents.onSuccess.rawValue, body: nil)
  }
  
  private func onError(_ reason: String) {
    sendEvent(withName: BridgeEvents.onError.rawValue, body: reason)
  }
  
  override func supportedEvents() -> [String]! {
    return [BridgeEvents.onSuccess.rawValue, BridgeEvents.onError.rawValue]
    }
}
