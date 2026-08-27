// ==============================================
// 🚀 การตั้งค่าเกม — แก้ไขได้ตามต้องการ
// ==============================================

// 🔑 JSONBin Credentials
export const JSONBIN = {
  BIN_ID: "6a909a98da38895dfe199512", // เช่น "66ab1234ef567890abcd1234"
  API_KEY: "$2a$10$.uGGo6xkjL5ZyJb8nbwz7.oukTQvftA6RLYpovsTMpd6.kzbqtV82" // ใส่ X-MASTER-KEY เต็มๆ จากรูป
};

// 🌍 รายการประเทศ — เพิ่ม/ลับ/แก้ชื่อ/ธงได้เลย
export const COUNTRIES = [
  { name: "ไทย", flag: "🇹🇭" },
  { name: "สหรัฐอเมริกา", flag: "🇺🇸" },
  { name: "ญี่ปุ่น", flag: "🇯🇵" },
  { name: "เกาหลีใต้", flag: "🇰🇷" },
  { name: "จีน", flag: "🇨🇳" },
  // เพิ่มประเทศตรงนี้ได้เลย
  // { name: "อังกฤษ", flag: "🇬🇧" },
];

// ⚙️ การตั้งค่าเพิ่มเติม
export const SETTINGS = {
  REFRESH_INTERVAL: 3000, // รีเฟรชคะแนนกี่มิลลิวินาที (3000 = 3 วินาที)
  STARTING_SCORE: 0,     // คะแนนเริ่มต้น
};
