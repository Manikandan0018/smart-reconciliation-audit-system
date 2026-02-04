export const reconcileRecord = (record, existing) => {
  if (!existing) return "Unmatched";

  if (
    record.transactionId === existing.transactionId &&
    record.amount === existing.amount
  ) {
    return "Matched";
  }

  if (record.referenceNumber === existing.referenceNumber) {
    const diff = Math.abs(record.amount - existing.amount);
    if (diff / existing.amount <= 0.02) return "Partial";
  }

  return "Unmatched";
};
