const reduceNumber = (num: number): number => {
  if (num === 11 || num === 22) return num;
  if (num < 10) return num;
  return reduceNumber(
    num
      .toString()
      .split("")
      .reduce((acc, curr) => acc + parseInt(curr), 0)
  );
};

export const getLifePathNumber = (
  dayStr: string,
  monthStr: string,
  yearStr: string
): string => {
  // Hàm đệ quy để cộng tổng các chữ số
  const reduceSum = (num: number): number => {
    // Giữ nguyên số Master (11, 22, 33)
    if (num === 11 || num === 22 || num === 33) return num;
    if (num < 10) return num;

    // Cộng tổng các chữ số
    let sum = 0;
    const digits = num.toString().split("");
    for (let digit of digits) {
      sum += parseInt(digit);
    }
    return reduceSum(sum);
  };

  const day = parseInt(dayStr);
  const month = parseInt(monthStr);
  const year = parseInt(yearStr);

  // Cách tính phổ biến: Rút gọn từng phần rồi cộng lại
  // (Ngày rút gọn) + (Tháng rút gọn) + (Năm rút gọn)
  const reducedDay = reduceSum(day);
  const reducedMonth = reduceSum(month);
  const reducedYear = reduceSum(year);

  const finalSum = reducedDay + reducedMonth + reducedYear;
  return reduceSum(finalSum).toString();
};

export const getDailyNumber = (dobDay: string, dobMonth: string) => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  // Tính số năm thế giới (Universal Year)
  const universalYear = reduceNumber(currentYear);

  // Tính số ngày cá nhân
  // (Ngày sinh + Tháng sinh + Năm thế giới + Ngày hiện tại + Tháng hiện tại) -> Rút gọn
  const d = parseInt(dobDay);
  const m = parseInt(dobMonth);

  const sum = d + m + universalYear + currentDay + currentMonth;
  return reduceNumber(sum);
};

// Map số sang Màu sắc & Giờ vàng
export const getMysticAttributes = (dailyNumber: number) => {
  // Mapping đơn giản dựa trên năng lượng các con số
  const map: Record<number, { color: string; hour: string }> = {
    1: { color: "Đỏ", hour: "6h-8h" }, // Tiên phong, năng lượng
    2: { color: "Trắng", hour: "20h-22h" }, // Trực giác, kết nối
    3: { color: "Vàng", hour: "11h-13h" }, // Sáng tạo, giao tiếp
    4: { color: "Xanh lá", hour: "5h-7h" }, // Ổn định, trật tự
    5: { color: "Xanh dương", hour: "15h-17h" }, // Tự do, thay đổi
    6: { color: "Hồng", hour: "18h-20h" }, // Yêu thương, gia đình
    7: { color: "Tím", hour: "22h-0h" }, // Tâm linh, tri thức
    8: { color: "Vàng kim", hour: "13h-15h" }, // Thịnh vượng, quyền lực
    9: { color: "Cam đất", hour: "9h-11h" }, // Nhân đạo, kết thúc
    11: { color: "Bạc", hour: "23h-1h" }, // Trực giác cao
    22: { color: "Vàng đồng", hour: "10h-12h" }, // Kiến tạo
  };

  // Mặc định fallback về số 9 nếu ra số lạ
  return map[dailyNumber] || map[9];
};

export const getMoonPhaseData = () => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 3) {
    year--;
    month += 12;
  }

  ++month;

  // Công thức xấp xỉ tính tuổi trăng (Simple Julian Date approx)
  let c = 365.25 * year;
  let e = 30.6 * month;
  let total = c + e + day - 694039.09; // Julian date adjustment
  total /= 29.5305882; // Synodic month
  let phase = total - Math.floor(total); // Lấy phần thập phân

  // Tuổi trăng (0 đến ~29.5)
  const moonAge = Math.round(phase * 29.53);

  let phaseName = "";
  let advice = "";

  // Phân loại giai đoạn
  if (moonAge <= 1) {
    phaseName = "Trăng Non";
    advice = "Khởi đầu mới, gieo hạt giống";
  } else if (moonAge < 7) {
    phaseName = "Trăng Lưỡi Liềm";
    advice = "Hành động, thu thập";
  } else if (moonAge === 7 || moonAge === 8) {
    phaseName = "Bán Nguyệt Đầu";
    advice = "Điều chỉnh, vượt trở ngại";
  } else if (moonAge < 14) {
    phaseName = "Trăng Khuyết";
    advice = "Hoàn thiện, tinh chỉnh";
  } else if (moonAge === 14 || moonAge === 15) {
    phaseName = "Trăng Tròn";
    advice = "Thành tựu, biết ơn";
  } else if (moonAge < 22) {
    phaseName = "Trăng Khuyết (Cuối)";
    advice = "Chia sẻ, giải phóng";
  } else if (moonAge === 22 || moonAge === 23) {
    phaseName = "Bán Nguyệt Cuối";
    advice = "Buông bỏ, tha thứ";
  } else {
    phaseName = "Trăng Tàn";
    advice = "Nghỉ ngơi, thanh tẩy";
  }

  return {
    moonAge, // Số ngày tuổi (ví dụ: 28)
    phaseName,
    advice,
    monthLabel: `Tháng ${new Date().getMonth() + 1}`,
  };
};

export const getZodiacSign = (dayStr: string, monthStr: string): string => {
  const day = parseInt(dayStr);
  const month = parseInt(monthStr);

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Bảo Bình";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
    return "Song Ngư";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return "Bạch Dương";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return "Kim Ngưu";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return "Song Tử";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return "Cự Giải";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Sư Tử";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Xử Nữ";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return "Thiên Bình";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Bọ Cạp";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Nhân Mã";
  return "Ma Kết";
};
