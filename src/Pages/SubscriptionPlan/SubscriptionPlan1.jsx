import React from "react";

const SubscriptionPlan1 = () => {
  return (
    <section className="py-5 bg-white rounded">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-black">Pricing & Plans</h2>
          <p className="mt-3 text-muted fs-5">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </p>
        </div>

        <div className="d-block">
          <div className="table-responsive">
            <table className="table table-borderless align-middle text-center">
              <thead>
                <tr>
                  <th className="py-4"></th>
                  {/* <th className="py-4">
                    <span className="d-block text-primary fw-medium">Free</span>
                    <p className="display-4 fw-bold mt-3 mb-2">$0</p>
                    <p className="text-muted mb-0">Per month</p>
                  </th> */}
                  <th className="py-4">
                    <span className="d-block text-primary fw-medium">Team</span>
                    <p className="display-4 fw-bold mt-3 mb-2">$99</p>
                    <p className="text-muted mb-0">Per month</p>
                  </th>
                  <th className="py-4 bg-dark text-white rounded-top">
                    <span className="badge bg-primary px-3 py-2 text-uppercase">
                      Popular
                    </span>
                    <p className="display-4 fw-bold mt-3 mb-2 text-white">$150</p>
                    <p className="text-light mb-0">For six month</p>
                  </th>
                  <th className="py-4">
                    <span className="d-block text-primary fw-medium">Enterprise</span>
                    <p className="display-4 fw-bold mt-3 mb-2">$490</p>
                    <p className="text-muted mb-0">For one month</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Website number</td>
                  {/* <td className="text-center">01</td> */}
                  <td className="text-center">10</td>
                  <td className="text-center bg-dark text-white">50</td>
                  <td className="text-center">Unlimited</td>
                </tr>
                <tr>
                  <td>Server storage</td>
                  {/* <td className="text-center">100 GB</td> */}
                  <td className="text-center">500 GB</td>
                  <td className="text-center bg-dark text-white">1 TB</td>
                  <td className="text-center">Unlimited</td>
                </tr>
                <tr>
                  <td>Database</td>
                  {/* <td className="text-center">-</td> */}
                  <td className="text-center">15</td>
                  <td className="text-center bg-dark text-white">Unlimited</td>
                  <td className="text-center">Unlimited</td>
                </tr>
                <tr>
                  <td>Unmetered Bandwidth</td>
                  {/* <td className="text-center">-</td> */}
                  <td className="text-center">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                  <td className="text-center bg-dark text-white">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                  <td className="text-center">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                </tr>
                <tr>
                  <td>SSD Disk</td>
                  {/* <td className="text-center">-</td> */}
                  <td className="text-center">-</td>
                  <td className="text-center bg-dark text-white">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                  <td className="text-center">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                </tr>
                <tr>
                  <td>VCPUS Fontworld</td>
                  {/* <td className="text-center">-</td> */}
                  <td className="text-center">-</td>
                  <td className="text-center bg-dark text-white">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                  <td className="text-center">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                </tr>
                <tr>
                  <td>WordPress install</td>
                  {/* <td className="text-center">-</td> */}
                  <td className="text-center">-</td>
                  <td className="text-center bg-dark text-white">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                  <td className="text-center">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                </tr>
                <tr>
                  <td>Server speed</td>
                  {/* <td className="text-center">-</td> */}
                  <td className="text-center">-</td>
                  <td className="text-center bg-dark text-white">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                  <td className="text-center">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pe-2"></td>

                  {/* <td className="px-2 py-3 text-center">
                    <a
                      href="#"
                      className="d-inline-flex align-items-center fw-semibold text-primary text-decoration-none hover-link"
                    >
                      Get Started
                      <svg
                        className="ms-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </td> */}

                  <td className="px-2 py-3 text-center">
                    <a
                      href="#"
                      className="d-inline-flex align-items-center fw-semibold text-primary text-decoration-none hover-link"
                    >
                      Get Started
                      <svg
                        className="ms-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </td>

                  <td className="px-2 py-3 text-center text-white bg-warning rounded-bottom">
                    <a
                      href="#"
                      className="d-inline-flex align-items-center fw-semibold text-white text-decoration-none"
                    >
                      Get Started
                      <svg
                        className="ms-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </td>

                  <td className="px-2 py-3 text-center">
                    <a
                      href="#"
                      className="d-inline-flex align-items-center fw-semibold text-primary text-decoration-none hover-link"
                    >
                      Get Started
                      <svg
                        className="ms-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlan1;
