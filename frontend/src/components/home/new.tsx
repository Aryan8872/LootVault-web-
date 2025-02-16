
const NewUpcomingReleases = () => {
    return (
        <div className="flex flex-col gap-10 bg-gray-100  px-5">
            <h1 className="font-nunitobold text-2xl  text-center mb-8">NEW AND UPCOMING RELEASES</h1>
            <div className="flex w-full justify-center">


                <div
                    className="flex relative rounded-[3rem] w-[55rem] h-96"
                    style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 0% 100%)'

                    }}
                >
                    <img
                        src="https://i.pinimg.com/736x/14/79/49/14794916ffa7e91b00337a3c4d556110.jpg "
                        alt="Assetto Corsa EVO"
                        className="rounded-[3rem] w-full h-full object-cover"
                        style={{
                            // borderBottomRightRadius: '15rem'

                        }}
                    />
                </div>

                <div
                    className="flex relative rounded-[3rem] w-[55rem] h-96" style={{
                        clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)'

                    }}>
                    <img
                        src="https://i.pinimg.com/736x/79/11/17/791117c8699dbe3ec06a5b05181140ba.jpg"
                        alt="Final Fantasy VII Rebirth"
                        className="rounded-[3rem] w-full h-full object-cover"
                        style={{
                            borderTopLeftRadius: '10rem'

                        }}
                    />
                </div>

            </div>
        </div>
    );
};

export default NewUpcomingReleases;
