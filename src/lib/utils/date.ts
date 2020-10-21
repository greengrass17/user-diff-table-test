export default class DateJs extends Date {
  toFormattedDateString(format: string) {
    if (!format || typeof format !== "string") {
      return this.toDateString();
    }
    return format
      .replace(
        /dd/g,
        this.getDate().toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
      )
      .replace(
        /mm/g,
        this.getMonth().toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
      )
      .replace(/yyyy/g, String(this.getFullYear()));
  }
}
