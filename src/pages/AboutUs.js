import React from "react";
import { Link } from "react-router-dom";

const featuredCars = [
  {
    brand: "VinFast",
    model: "VF 7 Plus",
    image: "VinFast_VF7.jpg",
    description:
      "SUV điện hiện đại với thiết kế cá tính, phù hợp nhịp sống đô thị và những chuyến đi cuối tuần.",
  },
  {
    brand: "Toyota",
    model: "Camry 2.5Q",
    image: "Toyota_Camry_2.5Q.jpg",
    description:
      "Mẫu sedan rộng rãi, cân bằng giữa sự thoải mái cho gia đình và vẻ lịch lãm khi đi làm.",
  },
  {
    brand: "Mercedes-Benz",
    model: "GLC 300 4MATIC",
    image: "Mercedes-Benz_GLC_300_4MATIC.jpg",
    description:
      "SUV sang trọng với không gian tiện nghi, dành cho người muốn tận hưởng sự tự tin trên mọi cung đường.",
  },
  {
    brand: "BMW",
    model: "X5 xDrive40i M Sport",
    image: "BMW_X5_xDrive40i_M_Sport.jpg",
    description:
      "Sự kết hợp giữa vẻ thể thao, không gian linh hoạt và cảm giác lái đầy hứng khởi.",
  },
  {
    brand: "VinFast",
    model: "VF 9 Eco",
    image: "VinFast_VF9_Eco.jpg",
    description:
      "Không gian SUV điện rộng rãi cho cả gia đình và những hành trình cần thêm sự thoải mái.",
  },
  {
    brand: "Toyota",
    model: "Yaris Cross HEV",
    image: "Toyota_Yaris_Cross_HEV.jpg",
    description:
      "SUV đô thị linh hoạt, lựa chọn đáng cân nhắc cho người cần sự tiện dụng trong nhịp sống hàng ngày.",
  },
  {
    brand: "Mercedes-Benz",
    model: "C 300 AMG",
    image: "Mercedes-Benz_C_300_AMG.jpg",
    description:
      "Dáng sedan thanh lịch cùng phong cách thể thao dành cho những ai yêu sự khác biệt.",
  },
  {
    brand: "BMW",
    model: "i4 eDrive40",
    image: "BMW_i4_eDrive40.jpg",
    description:
      "Một góc nhìn khác về xe điện: thiết kế cuốn hút, tinh thần thể thao và trải nghiệm lái mới mẻ.",
  },
];

const values = [
  {
    number: "01",
    title: "Lắng nghe trước khi tư vấn",
    description:
      "Mỗi người có một cách sử dụng xe và một ưu tiên riêng. Chúng tôi bắt đầu bằng việc tìm hiểu nhu cầu, thói quen di chuyển, số thành viên trong gia đình và ngân sách dự kiến để gợi ý đúng hướng.",
  },
  {
    number: "02",
    title: "Thông tin rõ ràng, dễ so sánh",
    description:
      "Từ giá bán, trang bị đến loại nhiên liệu, khách hàng cần được cung cấp thông tin dễ hiểu để cân nhắc các lựa chọn. Chúng tôi khuyến khích đặt câu hỏi và dành thời gian tìm hiểu trước khi đưa ra quyết định.",
  },
  {
    number: "03",
    title: "Trải nghiệm thực tế quan trọng",
    description:
      "Thông số có thể giúp thu hẹp lựa chọn, nhưng cảm giác ngồi, tầm nhìn và sự thoải mái chỉ có thể cảm nhận trực tiếp. Hãy xem xe và đăng ký lái thử để tự mình đánh giá mẫu xe phù hợp.",
  },
  {
    number: "04",
    title: "Đồng hành sau khi nhận xe",
    description:
      "Việc chọn xe là khởi đầu của một hành trình dài. Chúng tôi mong muốn tiếp tục hỗ trợ khách hàng với sự tận tình và những thông tin cần thiết trong quá trình sử dụng xe.",
  },
];

function AboutUs() {
  return (
    <main>
      <section className="container py-5 mt-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-10 col-xl-9">
            <p className="text-uppercase text-danger fw-bold mb-2">
              Hoàng Nguyễn Auto
            </p>
            <h1 className="display-4 fw-bold mb-3">
              Mỗi hành trình bắt đầu từ một lựa chọn phù hợp
            </h1>
            <p className="lead text-secondary mb-4">
              Chọn một chiếc xe không chỉ là chọn kiểu dáng hay thương hiệu. Đó
              còn là chọn người bạn đồng hành cho công việc, cho gia đình và cho
              những cung đường còn đang chờ phía trước.
            </p>
            <p className="lead text-secondary mb-4">
              Hoàng Nguyễn Auto mong muốn giúp bạn khám phá các lựa chọn một
              cách gần gũi, rõ ràng và thoải mái hơn.
            </p>
            <Link className="btn btn-dark btn-lg" to="/hoangnguyen_auto/cars">
              Khám phá danh sách xe
            </Link>
          </div>
        </div>

        <div className="ratio ratio-21x9 rounded-4 overflow-hidden mt-5">
          <img
            src={`${process.env.PUBLIC_URL}/image/BMW_320i_Sport_Line.jpg`}
            className="img-fluid object-fit-cover"
            alt="BMW 320i Sport Line"
          />
        </div>
      </section>

      <section className="container py-5">
        <div className="row align-items-end g-3 mb-4">
          <div className="col-lg-8">
            <p className="text-danger fw-bold text-uppercase mb-2">
              Khám phá các thương hiệu
            </p>
            <h2 className="display-6 fw-bold mb-0">
              Nhiều phong cách, nhiều hành trình
            </h2>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
          {featuredCars.map((car) => (
            <div className="col" key={`${car.brand}-${car.model}`}>
              <article className="card h-100 border-0 shadow-sm">
                <div className="ratio ratio-4x3">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/${car.image}`}
                    alt={`${car.brand} ${car.model}`}
                    className="card-img-top object-fit-cover"
                  />
                </div>
                <div className="card-body">
                  <p className="small text-danger text-uppercase fw-bold mb-1">
                    {car.brand}
                  </p>
                  <h3 className="h5 fw-bold">{car.model}</h3>
                  <p className="card-text text-secondary mb-0">
                    {car.description}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link className="btn btn-outline-dark" to="/hoangnguyen_auto/cars">
            Xem tất cả mẫu xe
          </Link>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-7">
                <div className="ratio ratio-4x3">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/Toyota_Corolla_Cross.jpg`}
                    alt="Toyota Corolla Cross"
                    className="rounded-3 object-fit-cover"
                  />
                </div>
              </div>
              <div className="col-5">
                <div className="ratio ratio-1x1">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/Mercedes-Benz_C_200_Avantgarde.jpg`}
                    alt="Mercedes-Benz C 200 Avantgarde"
                    className="rounded-3 object-fit-cover"
                  />
                </div>
              </div>
              <div className="col-5">
                <div className="ratio ratio-1x1">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/VinFast_VF5.jpg`}
                    alt="VinFast VF5"
                    className="rounded-3 object-fit-cover"
                  />
                </div>
              </div>
              <div className="col-7">
                <div className="ratio ratio-4x3">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/BMW_320i_Sport_Line.jpg`}
                    alt="BMW 320i Sport Line"
                    className="rounded-3 object-fit-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <p className="text-danger fw-bold text-uppercase mb-2">
              Cùng bạn đi xa hơn
            </p>
            <h2 className="display-6 fw-bold">
              Chiếc xe phù hợp là chiếc xe hợp với cuộc sống của bạn.
            </h2>
            <p className="text-secondary">
              Có người cần một chiếc xe nhỏ gọn để đi phố mỗi ngày. Có người cần
              thêm chỗ cho cả gia đình, hành lý và những chuyến đi xa. Cũng có
              người muốn thử công nghệ điện hóa hoặc tìm một chiếc xe đem lại
              cảm hứng sau tay lái. Không có một câu trả lời giống nhau cho tất
              cả — chỉ có lựa chọn phù hợp với từng người.
            </p>
            <p className="text-secondary">
              Hãy dành thời gian xem những mẫu xe đang có, so sánh các trang bị
              và ghi lại những điều bạn muốn hỏi. Nếu đã tìm được mẫu xe ưng ý,
              bạn có thể liên hệ để tìm hiểu thêm hoặc đăng ký lái thử.
            </p>
            <Link className="btn btn-danger" to="/hoangnguyen_auto/cars">
              Tìm chiếc xe dành cho bạn
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container py-lg-3 text-center">
          <p className="text-danger fw-bold text-uppercase mb-2">
            Hành trình tiếp theo là của bạn
          </p>
          <h2 className="display-6 fw-bold mb-3">
            Bạn đã sẵn sàng khám phá chưa?
          </h2>
          
          <Link className="btn btn-dark btn-lg" to="/hoangnguyen_auto/cars">
            Xem danh sách xe
          </Link>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
