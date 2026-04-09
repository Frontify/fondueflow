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
