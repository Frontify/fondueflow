# fondueflow

Boilerplate code framework for the Webflow website.

## Deployment
The boilerplate code will be deployed to the website using `GitHub pages` when any changes are made to the `main` branch. It is recommended to commit changes on a feature branch and merge into the `main` branch using a `pull request` when completed and tested.

The optimised `CSS` and `JavaScript` files can be found here:

+ https://frontify.github.io/fondueflow/dist/styles/fondueflow.css
+ https://frontify.github.io/fondueflow/dist/scripts/fondueflow.js

## Adding a Section and Container

```html
<section class="ff-section">
    <div class="ff-container">
        <!-- Content is placed here -->
    </div>
</section>
```

## Grid

```html
<section class="ff-section">
    <div class="ff-container">
        <!-- Grid -->
        <div class="ff-row">
            <div class="ff-col">Auto</div>
            <div class="ff-col">Auto</div>
            <div class="ff-col">Auto</div>
        </div>
        <div class="ff-row">
            <div class="ff-col-3">col-3</div>
            <div class="ff-col-6">col-6</div>
            <div class="ff-col-3">col-3</div>
        </div>
        <div class="ff-row">
            <div class="ff-col-12 ff-col-md-6 ff-col-lg-4">Column A</div>
            <div class="ff-col-12 ff-col-md-6 ff-col-lg-4">Column B</div>
            <div class="ff-col-12 ff-col-md-12 ff-col-lg-4">Column C</div>
        </div>
        <!-- /END: Grid -->
    </div>
</section>
```

## Flow

```html
<section class="ff-section">
    <div class="ff-container">
        <div class="ff-flow">
            <h1>Welcome</h1>
            <p>This is a simple paragraph within the .ff-flow element.</p>
            <p>Notice the margin is added to the paragraph elements but not the heading, the first element.</p>
            <p>This provides equal spacing within a container.</p>
            <a href="#">See more</a>
        </div>
    </div>
</section>
```

## Components

### Button

```html
<section class="ff-section">
    <div class="ff-container">
        <!-- Button: Dark Mode -->
        <a href="#" role="button" class="ff-button ff-button--dark">Button dark</a>
        <!-- Button: Light Mode -->
        <a href="#" role="button" class="ff-button ff-button--light">Button light</a>
    </div>
</section>
```

### Card

```html
<section class="ff-section">
    <div class="ff-container">
        <!-- Component: Card -->
        <div class="ff-card-container">
            <div class="ff-card">
                <div class="ff-card__content">
                    <p>This is a card.</p>
                    <p>This is a card.</p>
                    <p>This is a card.</p>
                    <p>This is a card.</p>
                </div>
            </div>
            <div class="ff-card">
                <div class="ff-card__content">
                    This is a second card.
                </div>
            </div>
            <div class="ff-card">
                <div class="ff-card__content">
                    This is a second card.
                </div>
            </div>
        </div>
        <!-- / END: Component: Card -->
    </div>
</section>
```

## Link

```html
<!-- Link -->
<a href="#" class="ff-link">See more</a>
<!-- Link opens in a new tab -->
<a href="#" class="ff-link" target="_blank" rel="noopener noreferrer">See more</a>
```