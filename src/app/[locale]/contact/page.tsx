import React from 'react';
import {ContactForm} from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";

export default function ContactPage() {
    return (
        <>
            <ContactHero/>
            <ContactForm/>
        </>
    );
}