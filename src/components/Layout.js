import React from "react";
import tw, { styled } from "twin.macro";

const Page = tw.div`
h-screen w-screen flex items-center justify-center bg-indigo-300 font-sans
`;

const Container = tw.main`
  bg-white rounded shadow p-6 m-4 w-full
`;

const Title = tw.h1`text-gray-900 text-4xl text-center font-bold`;

const Layout = ({ title, children, backLink }) => {
    return (
        <Page>
            <Container>
                <Title>{title}</Title>
                {backLink}
                {children}
            </Container>
        </Page>

    )
}

export default Layout