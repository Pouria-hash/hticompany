import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Meta from '../component/Meta';

const AboutUsScreen = () => {
	return (
		<div>
			<Meta title="در باره ما - شرکت هدف توسعه ایرانیان" />
			<header id="about-header">
				<h1>درباره ما</h1>
			</header>
			<main id="about-main">
				<Container>
					<Row>
						<Col lg={8}>
							<h3>درباره شرکت هدف توسعه ایرانیان</h3>
							<p className="pe-lg-2">
								با تکیه بر دانش فنی و تخصص ها و تجربیات اجرائی مدیران خود در تاريخ 1379 در اداره ثبت
								شركتها و مالكيت صنعتي تهران به ثبت رسید. از تاريخ تاسيس تا كنون اين مجموعه در پروژه هاي
								مختلف تاسيساتي، خطوط لوله آب، نفت و گاز و همچنين پروژه هاي توسعه صنعتی نفت و گاز و
								پتروشیمی حضور فعال داشته و عليرغم وجود مشکلات مختلف اجرايي ، با ارائه راه كارهاي اجرايي
								مناسب، بيش از 30 پروژه مختلف را به اجرا در آورده است. <br />شرکت هدف توسعه ایرانیان با
								ایجاد توانمندی لازم در حوزه‌های ساخت و نصب تجهیزات پروژه‌های صنعتی توانسته است با ارائه
								همزمان خدمات ساخت و تامین تجهیزات به سرعت و کیفیت کار خویش بیافزاید
							</p>
						</Col>
						<Col lg={4}>
							<img
								src="https://res.cloudinary.com/dhz3fae76/image/upload/v1617438647/HT-Company/hohyeong-lee-e0uCDHd19U4-unsplash_jb2qf5.jpg"
								alt="about hadaf"
								className=""
							/>
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
};

export default AboutUsScreen;
