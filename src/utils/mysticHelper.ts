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
    1: { color: "Red", hour: "6h-8h" }, // Đỏ
    2: { color: "White", hour: "20h-22h" }, // Trắng
    3: { color: "Yellow", hour: "11h-13h" }, // Vàng
    4: { color: "Green", hour: "5h-7h" }, // Xanh lá
    5: { color: "Blue", hour: "15h-17h" }, // Xanh dương
    6: { color: "Pink", hour: "18h-20h" }, // Hồng
    7: { color: "Purple", hour: "22h-0h" }, // Tím
    8: { color: "Gold", hour: "13h-15h" }, // Vàng kim
    9: { color: "Terracotta", hour: "9h-11h" }, // Cam đất
    11: { color: "Silver", hour: "23h-1h" }, // Bạc
    22: { color: "Bronze", hour: "10h-12h" }, // Vàng đồng
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

  let phaseKey = "";

  // Phân loại giai đoạn
  if (moonAge <= 1) {
    phaseKey = "New"; // Trăng Non
  } else if (moonAge < 7) {
    phaseKey = "WaxingCrescent"; // Trăng Lưỡi Liềm
  } else if (moonAge === 7 || moonAge === 8) {
    phaseKey = "FirstQuarter"; // Bán Nguyệt Đầu
  } else if (moonAge < 14) {
    phaseKey = "WaxingGibbous"; // Trăng Khuyết
  } else if (moonAge === 14 || moonAge === 15) {
    phaseKey = "Full"; // Trăng Tròn
  } else if (moonAge < 22) {
    phaseKey = "WaningGibbous"; // Trăng Khuyết (Cuối)
  } else if (moonAge === 22 || moonAge === 23) {
    phaseKey = "LastQuarter"; // Bán Nguyệt Cuối
  } else {
    phaseKey = "WaningCrescent"; // Trăng Tàn
  }

  return {
    moonAge, // Số ngày tuổi (ví dụ: 28)
    phaseKey,
    currentMonth: new Date().getMonth() + 1,
  };
};

export const getZodiacSign = (dayStr: string, monthStr: string): string => {
  const day = parseInt(dayStr);
  const month = parseInt(monthStr);

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius"; // Bảo Bình
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces"; // Song Ngư
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"; // Bạch Dương
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"; // Kim Ngưu
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"; // Song Tử
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"; // Cự Giải
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"; // Sư Tử
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"; // Xử Nữ
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"; // Thiên Bình
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio"; // Bọ Cạp
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius"; // Nhân Mã

  return "Capricorn"; // Ma Kết
};
