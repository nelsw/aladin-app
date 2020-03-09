import React from 'react';
import Masonry from 'react-masonry-css';
import Image from '../../../components/Image/Image';

const ourTeam = () => (
  <section className="m-101 " id="our-team">
    <div className="container ">
      <div className="row ">
        <div
          className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aos-item "
          data-aos="fade-top"
        >
          <h1 className="text-center">Our Team</h1>
          <div className="bor-upper mx-auto mb-4" />
          <div className=" clearfix ">
            <Masonry
              breakpointCols={3}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              <div className="card">
                <Image
                  src={require('../../../assets/img/img-person6.jpg')}
                  alt=""
                  style={{ width: '100%' }}
                />
                <div className="p-3">
                  <h2>Adil Abbas</h2>
                  <p className="title"> CEO Aladin</p>
                  <p>
                    Entrepreneur passionate about business development,
                    channelling years of expertise and experience to innovate.
                    This accounting and business development graduate thrives
                    under pressure with a keen eye for problem solving. Adil
                    utilises disruptive technology to develop, scale and
                    customise various products/services, curating successful
                    projects and teams within a short time span. Experienced in
                    strategy, execution and sales (to just name a few), fuelled
                    by a competitive yet fun spirit, Abbas is on a mission to
                    transform businesses into successful empires . Life is a
                    canvas for learning and development and Adil takes full
                    advantage of opportunities to go that extra mile.
                  </p>
                  <p className="d-flex align-items-center justify-content-center">
                    Follow Us:{' '}
                    <a
                      href="https://www.linkedin.com/in/adil-abbas-64915918b/"
                      target="_blank"
                    >
                      <i className="fa fa-linkedin-square ml-2" />
                    </a>
                  </p>
                </div>
              </div>
              <div className="card">
                <Image
                  src={require('../../../assets/img/img-person1.jpg')}
                  alt=""
                  style={{ width: '100%' }}
                />
                <div className="p-3">
                  <h2>ABDUL REHMAN SANDHU</h2>
                  <p className="title">CFO</p>
                  <p>
                    Founder of multiple businesses including igniter100, Abdul
                    is a qualified and certified accountant with 10 years
                    expertise running his own practice. This entrepreneur likes
                    to stay one step ahead of the game and since transitioning
                    into the technology industry in 2005, his portfolio has gone
                    from strength to strength. With a keen eye for business
                    management and development, this newly found passion for
                    innovative technology paved a path to customer focussed,
                    efficient business processes. Abdul has years of experience
                    working across multiple industries, his latest ventures and
                    business solutions (YouRent, YeahSol and PracticePA - to
                    name a few) are a testament to his drive and vision for a
                    better world.
                  </p>
                  <p className="d-flex align-items-center justify-content-center">
                    Follow Us:{' '}
                    <a
                      href="https://uk.linkedin.com/in/abdulrehman-sandhu-492509127"
                      target="_blank"
                    >
                      <i className="fa fa-linkedin-square ml-2" />
                    </a>
                  </p>
                </div>
              </div>
              <div className="card">
                <Image
                  src={require('../../../assets/img/img-person.jpeg')}
                  alt=""
                  style={{ width: '100%' }}
                />
                <div className="p-3">
                  <h2>FLORIAN KRUEGER </h2>
                  <p className="title">COO</p>
                  <p>
                    For 20+ years, Florian has developed a broad and deep
                    knowledge of digital space. He is passionate about tying all
                    initiatives back to the strategic objectives which
                    facilitate usable outcomes for the clients. Florian
                    continues to be a Lecturer, Speaker and at times Co-chair
                    various International events ranging from MIT’s
                    International Society for Chief Data Officers to Blockchain
                    Innovation, Big Data Monetisation, or Keynotes for the Cloud
                    Forum. He has set up various CoE’s around DLT, for clients
                    like Statoil.
                  </p>
                  <p className="d-flex align-items-center justify-content-center">
                    Follow Us:
                    <a
                      href="https://www.linkedin.com/in/florian/"
                      target="_blank"
                    >
                      <i className="fa fa-linkedin-square ml-2" />
                    </a>
                  </p>
                </div>
              </div>
              <div className="card">
                <Image
                  src={require('../../../assets/img/img-person5.jpg')}
                  alt=""
                  style={{ width: '100%' }}
                />
                <div className="p-3">
                  <h2>STEVEN LUBKA</h2>
                  <p className="title">Advisor to Aladin</p>
                  <p>
                    Steven is the founder of Blockchain Capital Services, a
                    consulting firms that helps organizations navigate the
                    emerging blockchain and cryptocurrency sectors. Steven works
                    as a private consultant, public speaker, analyst and advisor
                    to a number of companies and projects. He has given talks on
                    blockchain technology at events hosted by large American
                    universities. Steven’s work has led him to doing everything
                    from designing blockchain network architecture, working as
                    an investment analyst, helping startups manage their
                    cryptocurrency initiatives, and working as an advisor to
                    blockchain projects.
                  </p>

                  <p className="d-flex align-items-center justify-content-center">
                    Follow Us:{' '}
                    <a
                      href="https://www.linkedin.com/in/steven-lubka-0014b0161/"
                      target="_blank"
                    >
                      <i className="fa fa-linkedin-square ml-2" />
                    </a>
                  </p>
                </div>
              </div>
              <div className="card">
                <Image
                  src={require('../../../assets/img/img-person2.jpg')}
                  alt=""
                  style={{ width: '100%' }}
                />
                <div className="p-3">
                  <h2>FARRUKH SHAHZAD</h2>
                  <p className="title">CSE</p>
                  <p>
                    Software Architect specialized in the development of bespoke
                    business applications like ERP, CRM and business process
                    automation, I.T consultant and cloud computing evangelist.
                  </p>
                  <p className="d-flex align-items-center justify-content-center">
                    Follow Us:{' '}
                    <a
                      href="https://www.linkedin.com/in/farrukhshahzad/"
                      target="_blank"
                    >
                      <i className="fa fa-linkedin-square ml-2" />
                    </a>
                  </p>
                </div>
              </div>

              <div className="card">
                <Image
                  src={require('../../../assets/img/img-person4.jpg')}
                  alt=""
                  style={{ width: '100%' }}
                />
                <div className="p-3">
                  <h2>Thelma Dhlovu</h2>
                  <p className="title">PR Executive</p>
                  <p>
                    Marketing Management graduate, author and award winning
                    artist with a rich history in design, Thelma has strategic
                    and execution experience. Managing successful campaigns (TV
                    Commercial with Channel 5, Editorial and Adverts with OK!
                    Magazine, S Magazine and Big City newspapers such as Daily
                    Mirror, Express and Star). Experience includes event
                    management, space planning, web design, social media,
                    visual; merchandising and commercial fashion styling (Hugo
                    Boss, Suitsupply & Moss Bros). Dhlovu is passionate about
                    paving the way to a brighter future, viewing the world as a
                    black canvas full of potential and the arts as a medium for
                    change
                  </p>

                  <p className="d-flex align-items-center justify-content-center">
                    Follow Us:{' '}
                    <a
                      href="https://www.linkedin.com/in/thelma-dhlovu-bb523747"
                      target="_blank"
                    >
                      <i className="fa fa-linkedin-square ml-2" />
                    </a>
                  </p>
                </div>
              </div>
            </Masonry>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ourTeam;
