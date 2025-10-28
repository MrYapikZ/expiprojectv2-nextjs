import React from 'react';

function ContactHero() {
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-start lg:px-32 px-8 py-48">
                <h1 className="md:text-8xl text-4xl font-bebas-neue leading-none text-start select-none">
                    Error 404: You Haven’t Messaged Us Yet.
                </h1>
                <p className="md:text-2xl text-xl leading-none select-none">
                    Don’t let that error persist — fix it by saying hi
                </p>
                <p className="md:text-lg text-md leading-none select-none">
                    We’re always debugging life and looking for cool humans to build with.
                </p>
            </div>
        </>
    );
}

export default ContactHero;