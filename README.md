<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/techsemicolon/react-guided-tour">
    <img src="images/logo.png" alt="Logo"  height="80">
  </a>

  <h3 align="center">React Guided Tour</h3>

  <p align="center">
    A customizable react package to walk user through guided tours!
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/techsemicolon/react-guided-tour/issues">Report Bug</a>
    ·
    <a href="https://github.com/techsemicolon/react-guided-tour/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

You have a great react webapp(or any app in general), where you have worked very hard to build lot of functionalities, widgets, layouts etc for the customer. You spent months and years building it.

Now, lets go into customer's shoes!

We all experience at least one website where there are so many options, buttons widgets and you feel lost! The most common and expected reaction is closing the browser tab, because its not good to visit a website and not know where to start.

Thats a user dropout!

This is why it is important for an app to guide user through the initial steps. Or to put it in simple terms, interact with the customer to let them know that you are here to help, and take them through a `Guided Tour` of your web app.

This package is built of the same purpose where you can configure a guided tour for the end user, with lot of customizable options to let you set up a tour that is suitable for the app.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you can install, configure the react package up and running.

### Installation

```sh
npm install --save react-guided-tour
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Simple usage

Wrap the your app components under the `GuidedTourProvider` and pass the configurations like below :

```jsx
import React from "react";
import { GuidedTourProvider } from "react-guided-tour";

const App = () => {
  const tourSteps = [
    {
      name: "welcome-user",
      anchor: "welcome",
      component: "Hello, welcome to the app",
    },
    {
      name: "see-off-user",
      anchor: "bye",
      component: "Thank you for browsing",
    },
  ];

  return (
    <GuidedTourProvider tourSteps={tourSteps}>
      <header guided-tour-anchor="welcome">Header</header>
      <div>Some Content</div>
      <footer guided-tour-anchor="bye">Footer</footer>
    </GuidedTourProvider>
  );
};

export default App;
```

Let's understand how it works :

- When you wrap your component tree inside the `GuidedTourProvider`, all the children of `GuidedTourProvider` get access to the utility functions which let you customize the user guided tour. For above example, we are just using default settings so we do not need utility hooks. Further examples will explore those in detail.
- You add an attribute `guided-tour-anchor='...'` to any element in any of your children component of `GuidedTourProvider`, which acts as an anchor for the tour popover.
- You create a configuration object, which is a simple json array of `TourSteps`, which contain `name` of the step, `anchor` which is the value of `guided-tour-anchor` attribute and `component` which is just a plain text in this example.

And thats it! This will take the user through the guided tour as shown in the screencast below.

### Starting the tour manually

You might want to wait for certain user actions before you start the guided tour for the user. For example, waiting for user to click on an action button which says `Start Tour` or may be wait for certain time before starting the tour. In that case, the utility hooks are handy.

```jsx
import React from "react";
import { GuidedTourProvider } from "react-guided-tour";

const App = () => {
  const { startTour } = useGuidedTour();

  const tourSteps = [
    {
      name: "welcome-user",
      anchor: "welcome",
      component: "Hello, welcome to the app",
    },
    {
      name: "see-off-user",
      anchor: "bye",
      component: "Thank you for browsing",
    },
  ];

  return (
    <GuidedTourProvider>
      <header guided-tour-anchor="welcome">Header</header>
      <div>Some Content</div>
      <footer guided-tour-anchor="bye">Footer</footer>
      // Manually triggering the tour start
      <button onClick={() => startTour(tourSteps)}>Start Tour</button>
    </GuidedTourProvider>
  );
};

export default App;
```

### Using custom components

If you want to use custom components for the tour guide, you can pass any custom component in the `component` configuration of the tour step. These component should be a dumb/representational component.

```jsx
import React from "react";
import { GuidedTourProvider } from "react-guided-tour";

const WelcomeTourComponent = () => <>Hello, welcome to the app</>;
const SeeOffTourComponent = () => <>Thank you for browsing</>;

const App = () => {
  const { startTour } = useGuidedTour();

  const tourSteps = [
    {
      name: "welcome-user",
      anchor: "welcome",
      component: WelcomeTourComponent,
    },
    {
      name: "see-off-user",
      anchor: "bye",
      component: SeeOffTourComponent,
    },
  ];

  return (
    <GuidedTourProvider>
      <header guided-tour-anchor="welcome">Header</header>
      <div>Some Content</div>
      <footer guided-tour-anchor="bye">Footer</footer>
      // Manually triggering the tour start
      <button onClick={() => startTour(tourSteps)}>Start Tour</button>
    </GuidedTourProvider>
  );
};

export default App;
```

One thing to observer here is that, the tour step custom components do not need to have any buttons to go to next or previous step by default. These will be added for you. If you want to have have custom button, you can do it in 2 ways mentioned below.

### Using custom button for next and previous

```jsx
import React from "react";
import { GuidedTourProvider } from "react-guided-tour";
import { MyCustomButton } from "my-custom-button";

const App = () => {
  const { startTour } = useGuidedTour();

  const tourSteps = [
    {
      name: "welcome-user",
      anchor: "welcome",
      component: "Hello, welcome to the app",
    },
    {
      name: "see-off-user",
      anchor: "bye",
      component: "Thank you for browsing",
    },
  ];

  return (
    // Custom action button
    <GuidedTourProvider actionButtonComponent={MyCustomButton}>
      <header guided-tour-anchor="welcome">Header</header>
      <div>Some Content</div>
      <footer guided-tour-anchor="bye">Footer</footer>
      // Manually triggering the tour start
      <button onClick={() => startTour(tourSteps)}>Start Tour</button>
    </GuidedTourProvider>
  );
};

export default App;
```

### Disabling default next and back action buttons and handling that yourself in custom component

```jsx
import React from "react";
import { GuidedTourProvider } from "react-guided-tour";
import { MyCustomButton } from "my-custom-button";

const App = () => {
  const { startTour } = useGuidedTour();

  const WelcomeTourComponent = () => {
    const { goBack, goNext } = useGuidedTour();

    return (
      <>
        Hello, welcome to the app
        <button onClick={() => goBack()}>Back</button>
        <button onClick={() => goNext()}>Next</button>
      </>
    );
  };

  const tourSteps = [
    {
      name: "welcome-user",
      anchor: "welcome",
      component: WelcomeTourComponent,
      handleActions: false, //disabling default action buttons, only works when you define custom component
    },
    {
      name: "see-off-user",
      anchor: "bye",
      component: "Thank you for browsing",
    },
  ];

  return (
    // Custom action button
    <GuidedTourProvider actionButtonComponent={MyCustomButton}>
      <header guided-tour-anchor="welcome">Header</header>
      <div>Some Content</div>
      <footer guided-tour-anchor="bye">Footer</footer>
      // Manually triggering the tour start
      <button onClick={() => startTour(tourSteps)}>Start Tour</button>
    </GuidedTourProvider>
  );
};

export default App;
```

### All utility hooks

- `startTour: (tour: TourStep[]) => void` : Starts the tour with given tour step configurations
- `goToTourStep: (name: string) => void` : Skips to a specific tour step by tour step name
- `skipTour: () => void` : Skips entire guided tour
- `goNext: () => void` : Go to next step in the guided tour
- `goBack: () => void` : Go to previous step in the guided tour
- `getCurrentTourStep: () => string` : Get name of the current step

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add a way to wait for an async action before going to next step
- [x] Compatibiity with react `Suspense` / Lazy loaded components

See the [open issues](https://github.com/techsemicolon/react-guided-tour/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Mihir Bhende - [Tech Blog](https://techsemicolon.github.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/techsemicolon/react-guided-tour/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/techsemicolon/react-guided-tour/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/techsemicolon/react-guided-tour/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/techsemicolon/react-guided-tour/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/techsemicolon/react-guided-tour/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/mihir-bhende-63a3558a/
[product-screenshot]: images/screenshot.png
