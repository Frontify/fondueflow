# fondueflow

![Node version](https://img.shields.io/badge/dynamic/regex?url=https%3A%2F%2Fraw.githubusercontent.com%2FOWNER%2FREPO%2Fmain%2F.nvmrc&search=%5E(v%3F.*)%24&replace=%241&label=node&logo=nodedotjs)

Boilerplate code framework for the Webflow website.

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