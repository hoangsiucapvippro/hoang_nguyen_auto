import React from "react";
import { Link } from "react-router-dom";

const milestones = [
  {
    year: "2018",
    title: "Khởi đầu từ sự tận tâm",
    description:
      "Hoàng Nguyễn Auto bắt đầu với cam kết tư vấn đúng nhu cầu và đồng hành cùng khách hàng.",
  },
  {
    year: "2021",
    title: "Mở rộng hành trình",
    description:
      "Thêm nhiều lựa chọn xe và dịch vụ để khách hàng tìm được người bạn đồng hành phù hợp.",
  },
  {
    year: "Hôm nay",
    title: "Luôn hướng về phía trước",
    description:
      "Không ngừng cải thiện trải nghiệm mua xe bằng sự minh bạch và dịch vụ chu đáo.",
  },
];

function AboutUs() {
  return (
    <div>
      <div
        className="text-white d-flex align-items-center"
        style={{
          minHeight: "800px",
          backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url("${process.env.PUBLIC_URL}/image/VinFast_VF7.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container py-5">
          <h3 className="text-uppercase fw-bold">Hoàng Nguyễn Auto</h3>
          <h1 className="display-2 fw-bold">
            Mỗi hành trình
            <br />
            bắt đầu từ niềm tin.
          </h1>
          <p className="lead col-lg-6 my-4">
            Không chỉ trao chìa khóa, chúng tôi cùng bạn chọn một hành trình
            xứng đáng và an tâm trên mọi cung đường.
          </p>
        </div>
      </div>

      <div className="container py-5 my-lg-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-4">
            <h3 className="text-primary fw-bold">CÂU CHUYỆN CỦA CHÚNG TÔI</h3>
          </div>
          <div className="col-lg-8">
            <h2 className="display-5 fw-semibold">
              Chọn xe bằng sự thấu hiểu.
              <br />
              Đi xa bằng sự an tâm.
            </h2>
            <p className="text-secondary mt-4">
              Hoàng Nguyễn Auto là nơi những người yêu xe gặp nhau. Chúng tôi
              lắng nghe điều bạn cần, chia sẻ thông tin rõ ràng và chăm sóc bạn
              cả sau ngày nhận xe. Bởi một lựa chọn tốt không dừng lại ở chiếc
              xe — đó là cảm giác an tâm trên mỗi cung đường.
            </p>
            <Link
              className="btn btn-link px-0 text-decoration-none"
              to="/hoangnguyen_auto/cars"
            >
              Khám phá các dòng xe →
            </Link>
          </div>
        </div>
      </div>

      <section className="container pb-5">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 h-100">
              <img
                className="card-img-top rounded"
                src={`${process.env.PUBLIC_URL}/image/VinFast_VF9_Eco.jpg`}
                alt="VinFast VF9 màu xanh"
                style={{ height: "360px", objectFit: "cover" }}
              />
              <div className="card-body px-0">
                <p className="text-primary fw-bold mb-1">KHÔNG GIAN RỘNG MỞ</p>
                <h3 className="h4">VinFast VF 9</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 h-100">
              <img
                className="card-img-top rounded"
                src={`${process.env.PUBLIC_URL}/image/VinFast_VF8_Eco.jpg`}
                alt="VinFast VF8 màu bạc"
                style={{ height: "260px", objectFit: "cover" }}
              />
              <div className="card-body px-0">
                <p className="text-primary fw-bold mb-1">
                  CÂN BẰNG MỌI HÀNH TRÌNH
                </p>
                <h3 className="h4">VinFast VF 8</h3>
                <p className="text-secondary">
                  Chúng tôi luôn sẵn sàng giúp bạn tìm chiếc xe phù hợp với
                  những chuyến đi phía trước.
                </p>
                <Link
                  className="btn btn-link px-0 text-decoration-none"
                  to="/hoangnguyen_auto/cars"
                >
                  Tìm chiếc xe của bạn →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <p className="text-primary fw-bold">TẦM NHÌN & SỨ MỆNH</p>
          <div className="row g-4 mt-2">
            <div className="col-md-6">
              <div className="bg-white rounded p-4 p-lg-5 h-100">
                <p className="text-primary fw-bold">01 / TẦM NHÌN</p>
                <h2 className="h3">
                  Trở thành điểm đến đáng tin cậy của mọi người yêu xe.
                </h2>
                <p className="text-secondary mb-0">
                  Tạo nên trải nghiệm mua và sử dụng xe đơn giản, minh bạch và
                  gần gũi.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bg-white rounded p-4 p-lg-5 h-100">
                <p className="text-primary fw-bold">02 / SỨ MỆNH</p>
                <h2 className="h3">
                  Đặt khách hàng ở trung tâm của mọi hành trình.
                </h2>
                <p className="text-secondary mb-0">
                  Tư vấn bằng sự chân thành, phục vụ bằng chuyên môn và luôn có
                  mặt khi bạn cần.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5 my-lg-4">
        <div className="row g-5">
          <div className="col-lg-4">
            <p className="text-primary fw-bold">ĐIỀU CHÚNG TÔI TIN</p>
            <h2 className="display-6 fw-semibold">
              Tốt hơn trong từng chi tiết.
            </h2>
          </div>
          <div className="col-lg-8">
            <div className="row g-4">
              <div className="col-md-6">
                <h3 className="h5">Khách hàng là trọng tâm</h3>
                <p className="text-secondary">
                  Mỗi lời tư vấn bắt đầu từ nhu cầu thực sự của bạn.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="h5">Minh bạch trong lựa chọn</h3>
                <p className="text-secondary">
                  Thông tin rõ ràng để bạn tự tin với quyết định của mình.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="h5">Đồng hành dài lâu</h3>
                <p className="text-secondary mb-0">
                  Dịch vụ tận tâm trước, trong và sau khi nhận xe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <p className="text-primary fw-bold">NHỮNG CỘT MỐC</p>
          <h2 className="display-6 fw-semibold mb-4">
            Một hành trình được tạo nên từ niềm tin.
          </h2>
          <div className="row g-4">
            {milestones.map((milestone) => (
              <div className="col-md-4" key={milestone.year}>
                <div className="border-top border-primary border-3 pt-3 h-100">
                  <p className="text-primary fw-bold">{milestone.year}</p>
                  <h3 className="h5">{milestone.title}</h3>
                  <p className="text-secondary mb-0">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark text-white text-center py-5">
        <div className="container py-3">
          <p className="text-uppercase fw-bold">
            Hành trình tiếp theo là của bạn
          </p>
          <h2 className="display-6 fw-semibold mb-4">
            Sẵn sàng tìm chiếc xe dành cho mình?
          </h2>
          <Link className="btn btn-light" to="/hoangnguyen_auto/cars">
            Xem danh sách xe
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
