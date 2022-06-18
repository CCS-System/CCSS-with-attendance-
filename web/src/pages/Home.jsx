import React from "react";
import { useNavigate } from "react-router-dom";

import '../styles/quick-website.css';
import hero from "../illustrations/illustration-3.svg"
import num1 from "../illustrations/illustration-5.svg";
import num2 from "../illustrations/illustration-6.svg";
import num3 from "../illustrations/illustration-7.svg"

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <section class="slice py-7">
                <div class="container">
                    <div class="row row-grid align-items-center">
                        <div class="col-12 col-md-5 col-lg-6 order-md-2 text-center">

                            <figure class="w-100">
                                <img alt="Image placeholder" src={hero} class="img-fluid mw-md-120" />
                            </figure>
                        </div>
                        <div class="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">

                            <h1 class="display-4 text-center text-md-left mb-3">
                                It's time to Manage your <strong class="text-primary">schedule</strong>
                            </h1>

                            <p class="lead text-center text-md-left text-muted">
                                College Class Scheduling System with Integrated Attendance
                            </p>

                            <div class="text-center text-md-left mt-5">
                                <a onClick={() => { navigate("/login") }} class="btn btn-primary btn-icon">
                                    <span class="btn-inner--text" style = {{color:'white'}}>Get started</span>
                                    <span class="btn-inner--icon"><i data-feather="chevron-right"></i></span>
                                </a>
                                {/* <a href="https://webpixels.io/illustrations" class="btn btn-neutral btn-icon d-none d-lg-inline-block">See Illustrations</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="slice slice-lg pt-lg-6 pb-0 pb-lg-6 bg-section-secondary">
                <div class="container">

                    <div class="row mb-5 justify-content-center text-center">
                        <div class="col-lg-6">
                            <span class="badge badge-soft-success badge-pill badge-lg">
                                Get started
                            </span>
                            <h2 class=" mt-4">College Class Scheduling System with Integrated Attendance</h2>
                            <div class="mt-2">
                                <p class="lead lh-180">Manage your schedules in one place!</p>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body pb-5">
                                    <div class="pt-4 pb-5">
                                        {/* <img src="assets/img/svg/illustrations/illustration-7.svg" class="img-fluid img-center" style="height: 150px;" alt="Illustration" /> */}
                                        <img src={num3} class="img-fluid img-center" style={{ height: 150 }} alt="Illustration" />
                                    </div>
                                    <h5 class="h4 lh-130 mb-3">Automatic Scheduling</h5>
                                    <p class="text-muted mb-0">Can generate a schedule for you automatically. No mannual work needed!</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body pb-5">
                                    <div class="pt-4 pb-5">
                                        <img src={num1} class="img-fluid img-center" style={{ height: 150 }} alt="Illustration" />
                                    </div>
                                    <h5 class="h4 lh-130 mb-3">Integrated Attendance</h5>
                                    <p class="text-muted mb-0">Teachers can take attendance right from the application</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body pb-5">
                                    <div class="pt-4 pb-5">
                                        <img src={num2} class="img-fluid img-center" style={{ height: 150 }} alt="Illustration" />
                                        {/* <img src="assets/img/svg/illustrations/illustration-6.svg" class="img-fluid img-center" style="height: 150px;" alt="Illustration" /> */}
                                    </div>
                                    <h5 class="h4 lh-130 mb-3">Get more done</h5>
                                    <p class="text-muted mb-0">An easy way to manage your class schedules</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </>
    );
};

export default Home;