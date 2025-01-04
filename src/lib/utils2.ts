import { Location } from "@/lib/helper.type";
import { format, isValid } from "date-fns";
import { vi } from "date-fns/locale";
// star
export const vietnamLocations: Location[] = [
  { star: 4.3 },
  { star: 4.8 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 2.5 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 4.4 },
  { star: 4.5 },
  { star: 3.5 },
  { star: 4.3 },
  { star: 4.8 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 2.5 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 2.5 },
  { star: 4.5 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 2.5 },
  { star: 4.5 },
];
export const formatStar = (star: number) => {
  return star ? star.toFixed(1).replace(".", ",") : star;
};

// handle usd to vietnamese
export let handleMoney = (
  money: number,
  ...detailMoney: {
    cleaningFee?: number;
    numberOfDays?: number;
  }[]
): string => {
  let cleaningFee = detailMoney[1]?.cleaningFee
    ? detailMoney[1].cleaningFee
    : 0;
  let numberOfDays = detailMoney[0]?.numberOfDays
    ? detailMoney[0].numberOfDays
    : 1;

  let totalMoney = money * 25;
  if (cleaningFee) {
    totalMoney = (money * numberOfDays + cleaningFee) * 25;
  } else if (numberOfDays) {
    totalMoney = money * numberOfDays * 25;
  }

  let formattedCurrency =
    new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(totalMoney) + " đ"; // Adding the "đ" symbol at the end
  return formattedCurrency.replace(",", ".");
};

// format money
export let formatMoney = (money: number): string | undefined => {
  let formattedCurrency =
    new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(money) + " đ"; // Adding the "đ" symbol at the end
  return formattedCurrency.replace(",", ".");
};

// handlemoney +  cleaning fee

// convert vietnameseCalendar
export const formatDateToVietnamese = (date: any) => {
  return format(date, "eeee, dd MMMM yyyy", { locale: vi });
};

export let formatVietNamDate = (date: any) => {
  let formatDateString = new Date(date);
  if (isValid(formatDateString)) {
    let VietnamDate = format(formatDateString, "eeee, dd MMMM yyyy", {
      locale: vi,
    });
    return VietnamDate;
  } else {
    return `Lỗi hiển thị`;
  }
};

export const vietnameseDate = formatDateToVietnamese(new Date());

// Destination map

export let mapIframe = [
  {
    id: 1,
    location: "Hồ Chí Minh",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1003460.804257871!2d105.44622140275165!3d10.752296297577377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1735407824349!5m2!1svi!2s",
    desc: "TPHCM nổi bật với sự phát triển năng động, nhộn nhịp và hiện đại, với nhiều công trình kiến trúc đặc sắc như Nhà thờ Đức Bà, Chợ Bến Thành, và các trung tâm thương mại lớn. Thành phố này cũng là nơi kết hợp hài hòa giữa các giá trị lịch sử, văn hóa truyền thống và nhịp sống hiện đại, nơi có sự phát triển mạnh mẽ của ngành công nghệ, giáo dục và y tế",
  },
  {
    id: 2,
    location: "Cần Thơ",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62860.63928560338!2d105.71637048085131!3d10.034184408547482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3edb7%3A0x527f09dbfb20b659!2zQ-G6p24gVGjGoSwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1735407300881!5m2!1svi!2s",
    desc: "Cần Thơ nổi bật với các nét văn hóa đặc trưng của miền Tây Nam Bộ như chợ nổi Cái Răng, một trong những điểm tham quan nổi tiếng. Thành phố còn có các di tích lịch sử, đình chùa, và các lễ hội văn hóa dân gian độc đáo. Du khách đến Cần Thơ không chỉ để tham quan cảnh quan sông nước, mà còn thưởng thức những món ăn đặc sản như bún riêu Cần Thơ, lẩu mắm, bánh xèo…",
  },
  {
    id: 3,
    location: "Nha Trang",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249525.46070197495!2d109.08168884986749!3d12.259420963862027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170677811cc886f%3A0x5c4bbc0aa81edcb9!2zTmhhIFRyYW5nLCBLaMOhbmggSMOyYSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1735407366209!5m2!1svi!2s",
    desc: " Nha Trang là nơi giao thoa của nhiều nền văn hóa, với các lễ hội truyền thống, đặc biệt là Lễ hội Tháp Bà Ponagar diễn ra vào tháng 3 âm lịch mỗi năm. Đây là dịp để người dân và du khách tham gia các hoạt động tôn vinh văn hóa Chăm, kết hợp với các sự kiện thể thao và văn hóa.",
  },
  {
    id: 4,
    location: "Hà Nội",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.97840467444!2d105.795763891016!3d21.022734639776747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1735407407209!5m2!1svi!2s",
    desc: "Hà Nội nổi bật với sự kết hợp hài hòa giữa kiến trúc cổ và hiện đại. Những ngôi nhà cổ trong khu phố cổ, những con phố nhỏ với các quán cà phê, cửa hàng truyền thống, cùng với các công trình hiện đại như các tòa nhà cao tầng, trung tâm thương mại lớn, tạo nên một không gian sống độc đáo.",
  },

  {
    id: 5,
    location: "Phú Quốc",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1006306.2267550124!2d103.13186315144351!3d9.860123731240199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78c62b49eda17%3A0x8aa79fbbdd72cdb!2zUGjDuiBRdeG7kWM!5e0!3m2!1svi!2s!4v1735407493995!5m2!1svi!2s",
    desc: "Phú Quốc nổi tiếng với nước mắm Phú Quốc, được sản xuất thủ công từ cá cơm và được coi là một trong những loại nước mắm ngon nhất Việt Nam",
  },
  {
    id: 6,
    location: "Đà Nẵng",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d981515.682746541!2d106.82967793933578!3d16.063121476999182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0x1df0cb4b86727e06!2zxJDDoCBO4bq1bmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1735407553375!5m2!1svi!2s",
    desc: "Đà Nẵng là một điểm đến lý tưởng với sự kết hợp hài hòa giữa biển, núi và sông, cùng với những công trình kiến trúc, di sản văn hóa độc đáo. Thành phố này không chỉ thu hút du khách bằng vẻ đẹp thiên nhiên mà còn bởi các dịch vụ du lịch cao cấp, sự phát triển đô thị hiện đại, và các điểm tham quan nổi tiếng.",
  },
  {
    id: 7,
    location: "Đà Lạt",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249857.12621580262!2d108.28590952416234!3d11.90386300597632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112fef20988b1%3A0xad5f228b672bf930!2zVHAuIMSQw6AgTOG6oXQsIEzDom0gxJDhu5NuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1735407611040!5m2!1svi!2s",
    desc: "Đà Lạt là thành phố lý tưởng cho những ai yêu thích thiên nhiên, sự yên tĩnh và muốn khám phá những nét văn hóa đặc sắc của vùng cao nguyên. Với khí hậu mát mẻ, cảnh sắc thơ mộng và nhiều điểm du lịch hấp dẫn, Đà Lạt luôn là lựa chọn hàng đầu cho những chuyến du lịch nghỉ dưỡng và khám phá.",
  },
  {
    id: 8,
    location: "Phan Thiết",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250743.8208681195!2d108.0091451054291!3d10.897315894641123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3176830f876e16e5%3A0x2a82c373d3a16cc8!2zVHAuIFBoYW4gVGhp4bq_dCwgQsOsbmggVGh14bqtbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1735407649403!5m2!1svi!2s",
    desc: "Phan Thiết còn có nền văn hóa đa dạng và những món ăn đặc sản hấp dẫn như bánh căn, cá lóc nướng, và hải sản tươi sống. Thành phố này không chỉ là điểm du lịch nổi tiếng mà còn là trung tâm kinh tế, văn hóa của tỉnh Bình Thuận, thu hút hàng triệu lượt khách mỗi năm.",
  },
];
