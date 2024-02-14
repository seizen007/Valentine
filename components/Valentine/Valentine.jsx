import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import picture from "../../assets/picture";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import app from "../../authentication/firebaseConfig";





const Valentine = () => {
	const [checkbox1Checked, setCheckbox1Checked] = useState(false);
	const [checkbox2Checked, setCheckbox2Checked] = useState(false);
	const [noReason, setNoReason] = useState("");
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	// Hardcoded image URLs
	const images = [picture.first, picture.sec, picture.third, picture.fourth];

	const handleCheckbox1Change = (event) => {
		setCheckbox1Checked(event.target.checked);
		setCheckbox2Checked(false);
	};

	const handleCheckbox2Change = (event) => {
		setCheckbox2Checked(event.target.checked);
		setCheckbox1Checked(false);
	};

	const handleNoReasonChange = (event) => {
		setNoReason(event.target.value);
	};

	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		useCss: false,
		autoplay: true,
		autoplaySpeed: 1500,
		cssEase: "linear",
        pauseOnHover: true,
        dotsClass: "slick-dots",

		beforeChange: (current, next) => setCurrentImageIndex(next),
	};
    const handleSaveData = async () => {
        const db = getFirestore();
        try {
          const docRef = await addDoc(collection(db, "valentineResponses"), {
            checkbox1Checked,
            checkbox2Checked,
            noReason,
            timestamp: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      };

	return (
		<div className="valentine font-nunito">
			<div className="container">
				<div className="wrapper relative ">
					{checkbox1Checked ? (
						<div className="wrapper flex items-center h-screen justify-center w-full ">
							<div className="yes-view">
								<div className="video-background z-[-1] fixed top-0 left-0 w-[100%] h-[100%] overflow-hidden ">
									<video
										autoPlay
										loop
										muted
										className="videoTag w-[100%] h-[100%] object-cover "
									>
										<source src={picture.mohona} type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								</div>
								<Slider
									{...settings}
									className="bg-pink-300/50 p-2 backdrop-blur-sm rounded-md !text-white"
								>
									{images.map((image, index) => (
										<div key={index}>
											<img
												className="w-full"
												src={image}
												alt={`Image ${index + 1}`}
											/>
										</div>
									))}
								</Slider>
								<p className="text-lg text-white pt-10">I Love You 😊</p>
							</div>
						</div>
					) : checkbox2Checked ? (
						<div className="wrapper flex  justify-center items-center  h-screen">
							<div className="no-view bg-violet-500 fixed justify-center items-center flex flex-col gap-5 w-full">
								<p className="text-lg text-white font-semibold pt-4">
									Ouch! AGH! that hurts! ahhhhhhhhh 😔
								</p>
								<p className=" capitalize text-white">Please tell me why? :</p>
								<textarea
									placeholder="Example : I do not like to see your ugly face"
									className="w-full py-5 border border-gray-300 "
									value={noReason}
									onChange={handleNoReasonChange}
								/>
                            <button className="border-white border-2 px-2 rounded text-white mb-3 hover:opacity-50" onClick={handleSaveData}>Submit</button>
							</div>
						</div>
					) : (
						<div
							className={`wrapper flex justify-center items-center h-screen`}
						>
							<div className="video-background fixed top-0 left-0 w-[100%] h-[100%] overflow-hidden z[-1] ">
								<video
									autoPlay
									loop
									muted
									className="videoTag w-[100%] h-[100%] object-cover "
								>
									<source src={picture.love} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							</div>

							<div className="question-bar fixed bg-pink-600/70 gap-y-10 justify-center w-full flex  flex-col items-center py-20 rounded  backdrop-blur-lg">
								<div className="question text-white">
									<p className="text-[24px] font-semibold capitalize">
										Will you be my Valentine?
									</p>
								</div>
								<div className="answer-bar flex gap-10">
									<div className="yes text-white">
										<input
											onChange={handleCheckbox1Change}
											type="checkbox"
											name="yes"
											checked={checkbox1Checked}
										/>
										<p>Yes</p>
									</div>
									<div className="no text-white">
										<input
											onChange={handleCheckbox2Change}
											type="checkbox"
											name="no"
											checked={checkbox2Checked}
										/>
										<p>No</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Valentine;
