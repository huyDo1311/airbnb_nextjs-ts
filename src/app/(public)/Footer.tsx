import React from "react";

const footerData = [
  {
    title: "Hỗ trợ",
    links: [
      "Trung tâm trợ giúp",
      "AirCover",
      "Chống phân biệt đối xử",
      "Hỗ trợ người khuyết tật",
      "Các tùy chọn hủy",
      "Báo cáo lo ngại của khu dân cư",
    ],
  },
  {
    title: "Đón tiếp khách",
    links: [
      "Cho thuê nhà trên Airbnb",
      "AirCover cho Chủ nhà",
      "Tài nguyên về đón tiếp khách",
      "Diễn đàn cộng đồng",
      "Đón tiếp khách có trách nhiệm",
      "Tham gia khóa học miễn phí về công việc Đón tiếp khách",
      "Tìm đồng chủ nhà",
    ],
  },
  {
    title: "Airbnb",
    links: [
      "Trang tin tức",
      "Tính năng mới",
      "Cơ hội nghề nghiệp",
      "Nhà đầu tư",
      "Chỗ ở khẩn cấp Airbnb.org",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-700 dark:text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {footerData.map((section, index) => (
          <div key={index}>
            <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t mt-8 pt-4 text-center text-sm  text-gray-500 dark:text-white">
        <p>
          © 2024 Airbnb, Inc. · Quyền riêng tư · Điều khoản · Sơ đồ trang web
        </p>
      </div>
    </footer>
  );
}
