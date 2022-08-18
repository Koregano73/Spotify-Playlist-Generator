import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from '../client/components/LoginPage.jsx';
import PlaylistForm from '../client/components/PlaylistForm.jsx';
import 'jsdom-global/register';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
// const render = ReactDOM.render;
const puppeteer = require('puppeteer');

describe("Test React Login Page", () => {
    let browser;
    let page;

    // beforeAll(async () =>{
    //     browser = await puppeteer.launch();
    //     page = await browser.newPage();
        
    // });

    // it('should be titled "Axolotl Beats"', async () => {
    //     await page.goto("http://localhost:8080");
    //     await expect(page.title()).resolves.toMatch('Axolotl Beats');
    // })

    it('should render a login button', () =>{
        render(<LoginPage />)
        const loginBtn = screen.getByRole('button', {name:/login/i})
        expect(loginBtn.getAttribute('class')).toEqual("login")
    })

    it('should render a click event when clicking Login Button', () => {
        const {container} = render(<LoginPage />);
        fireEvent.click(container.querySelector('#login-btn'));
    })
    
});

// xdescribe("PlaylistForm.jsx", () =>{
//     it('should render a form with class "playlist-form"', () =>{
//         render(<PlaylistForm />)
//         const playlistForm = screen.getByRole('form', {name:/playlist-form/i})
//         expect(playlistForm.getAttribute('class')).toEqual('playlist-form')
//     })
   
//     it('should submit the form', () =>{
//         const {container} = render(<PlaylistForm />)
        
//     })
// })



