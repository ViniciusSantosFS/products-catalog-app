import Foundation

extension DateFormatter {
  func getDateFromString(_ date: String) -> Date? {
    let dateFormatter = DateFormatter()
    
    dateFormatter.locale = Locale(identifier: "en-US")
    dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
    
    return dateFormatter.date(from: date)
  }
}
