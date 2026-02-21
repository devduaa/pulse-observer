module.exports = store => (req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const ms = Number(end - start) / 1e6;

    // Debug log – har request ka time dikhega (production mein comment out kar dena)
    console.log(`[Pulse DEBUG] ${req.method} ${req.originalUrl} finished in ${ms.toFixed(2)}ms`);

    // Invalid time ko skip kar do
    if (isNaN(ms) || ms <= 0) {
      console.warn("[Pulse WARN] Invalid time calculated:", ms, "for", req.method, req.originalUrl);
      return;
    }

    store.recordAPI(req.method, req.originalUrl, ms);
  });

  next();
};