import React from 'react';
import {ContactForm} from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";

function ContactPage() {
    return (
        <>
            <ContactHero/>
            <ContactForm/>
        </>
    );
}

export default ContactPage;