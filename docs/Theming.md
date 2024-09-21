# Theming

## Project Init

- `npm install --save @angular/material @angular/cdk @angular/animations`

In your host app add this to your app.module.ts

- Enable Animations: `imports: [BrowserAnimationsModule],`
- Disable Animations `imports: [NoopAnimationsModule],`

### Add Material Theme

Add the following to your styles.scss file (we will change this later)
`@import "@angular/material/prebuilt-themes/deeppurple-amber.css";`

### Create Light and Dark Tbeme .scss Files

In your host app create .src/scss/YOUR-THEME.theme.scss 

It should include a light theme, dark theme, and any typographies you expect to use.

```scss
@use '@angular/material' as mat;

$primary-light:  (
  50 : #effbef,
  100 : #d7f5d6,
  200 : #bceebb,
  300 : #a1e79f,
  400 : #8ce28b,
  500 : #78dd76,
  600 : #70d96e,
  700 : #65d463,
  800 : #5bcf59,
  900 : #48c746,
  A100 : #ffffff,
  A200 : #eaffea,
  A400 : #b8ffb7,
  A700 : #9fff9d,
  contrast: (
      50 : #000000,
      100 : #000000,
      200 : #000000,
      300 : #000000,
      400 : #000000,
      500 : #000000,
      600 : #000000,
      700 : #000000,
      800 : #000000,
      900 : #000000,
      A100 : #000000,
      A200 : #000000,
      A400 : #000000,
      A700 : #000000,
  )
);

$accent-light: (
  50 : #fffce0,
  100 : #fff7b3,
  200 : #fff280,
  300 : #ffec4d,
  400 : #ffe826,
  500 : #ffe400,
  600 : #ffe100,
  700 : #ffdd00,
  800 : #ffd900,
  900 : #ffd100,
  A100 : #ffffff,
  A200 : #fffcf2,
  A400 : #fff2bf,
  A700 : #ffeda6,
  contrast: (
      50 : #000000,
      100 : #000000,
      200 : #000000,
      300 : #000000,
      400 : #000000,
      500 : #000000,
      600 : #000000,
      700 : #000000,
      800 : #000000,
      900 : #000000,
      A100 : #000000,
      A200 : #000000,
      A400 : #000000,
      A700 : #000000,
  )
);

$warn-light: (
  50 : #feeaeb,
  100 : #fecccd,
  200 : #fdaaab,
  300 : #fc8789,
  400 : #fb6e70,
  500 : #fa5457,
  600 : #f94d4f,
  700 : #f94346,
  800 : #f83a3c,
  900 : #f6292c,
  A100 : #ffffff,
  A200 : #ffffff,
  A400 : #ffcece,
  A700 : #ffb4b5,
  contrast: (
      50 : #000000,
      100 : #000000,
      200 : #000000,
      300 : #000000,
      400 : #000000,
      500 : #000000,
      600 : #000000,
      700 : #ffffff,
      800 : #ffffff,
      900 : #ffffff,
      A100 : #000000,
      A200 : #000000,
      A400 : #000000,
      A700 : #000000,
  )
);

$primary-dark:  (
  50 : #effbef,
  100 : #d7f5d6,
  200 : #bceebb,
  300 : #a1e79f,
  400 : #8ce28b,
  500 : #78dd76,
  600 : #70d96e,
  700 : #65d463,
  800 : #5bcf59,
  900 : #48c746,
  A100 : #ffffff,
  A200 : #eaffea,
  A400 : #b8ffb7,
  A700 : #9fff9d,
  contrast: (
      50 : #000000,
      100 : #000000,
      200 : #000000,
      300 : #000000,
      400 : #000000,
      500 : #000000,
      600 : #000000,
      700 : #000000,
      800 : #000000,
      900 : #000000,
      A100 : #000000,
      A200 : #000000,
      A400 : #000000,
      A700 : #000000,
  )
);

$accent-dark: (
  50 : #fffce0,
  100 : #fff7b3,
  200 : #fff280,
  300 : #ffec4d,
  400 : #ffe826,
  500 : #ffe400,
  600 : #ffe100,
  700 : #ffdd00,
  800 : #ffd900,
  900 : #ffd100,
  A100 : #ffffff,
  A200 : #fffcf2,
  A400 : #fff2bf,
  A700 : #ffeda6,
  contrast: (
      50 : #000000,
      100 : #000000,
      200 : #000000,
      300 : #000000,
      400 : #000000,
      500 : #000000,
      600 : #000000,
      700 : #000000,
      800 : #000000,
      900 : #000000,
      A100 : #000000,
      A200 : #000000,
      A400 : #000000,
      A700 : #000000,
  )
);

$warn-dark: (
  50 : #fff2ea,
  100 : #ffdfcb,
  200 : #ffcaa8,
  300 : #ffb485,
  400 : #ffa46a,
  500 : #ff9450,
  600 : #ff8c49,
  700 : #ff8140,
  800 : #ff7737,
  900 : #ff6527,
  A100 : #ffffff,
  A200 : #ffffff,
  A400 : #ffe0d4,
  A700 : #ffcdbb,
  contrast: (
      50 : #000000,
      100 : #000000,
      200 : #000000,
      300 : #000000,
      400 : #000000,
      500 : #000000,
      600 : #000000,
      700 : #000000,
      800 : #000000,
      900 : #000000,
      A100 : #000000,
      A200 : #000000,
      A400 : #000000,
      A700 : #000000,
  )
);

$typography-config: mat.define-typography-config(
  $font-family: "Roboto, sans-serif",
  // mat.define-typography-level(font-size, line-height, ???, ???)
  $headline-1: mat.define-typography-level(112px, 112px, 300),
  $headline-2: mat.define-typography-level(56px, 56px, 400),
  $headline-3: mat.define-typography-level(45px, 48px, 400),
  $headline-4: mat.define-typography-level(34px, 40px, 400),
  $headline-5: mat.define-typography-level(32px, 40px, 400), // h1
  $headline-6: mat.define-typography-level(24px, 28px, 500), // h2
  $subtitle-1: mat.define-typography-level(20px, 28px, 400), // h3
  $subtitle-2: mat.define-typography-level(18px, 24px, 400), // h4
  $body-1: mat.define-typography-level(16px, 24px, 400),
  $body-2: mat.define-typography-level(16px, 20px, 600),
  $caption: mat.define-typography-level(14px, 20px, 400),
  $button: mat.define-typography-level(16px, 16px, 500),
  $overline: mat.define-typography-level(16px, 16px, 500),
);

// (
//     │ ┌───────────^
// 171 │ │   // TODO(mmalerba): rename this function to define-typography-config,
// 172 │ │   //  and create a predefined px based config for people that need it.
// 173 │ │   $font-family: mdc-typography.$font-family,
// 174 │ │   $headline-1: null,
// 175 │ │   $headline-2: null,
// 176 │ │   $headline-3: null,
// 177 │ │   $headline-4: null,
// 178 │ │   $headline-5: null,
// 179 │ │   $headline-6: null,
// 180 │ │   $subtitle-1: null,
// 181 │ │   $subtitle-2: null,
// 182 │ │   $body-1: null,
// 183 │ │   $body-2: null,
// 184 │ │   $caption: null,
// 185 │ │   $button: null,
// 186 │ │   $overline: null,
// 187 │ │ )


// $typography-config: mat.define-typography-config(
//   $font-family: "Roboto, sans-serif",
//   // mat.define-typography-level(font-size, line-height, ???, ???)
//   $display-4:     mat.define-typography-level(112px, 112px, 300),
//   $display-3:     mat.define-typography-level(56px, 56px, 400),
//   $display-2:     mat.define-typography-level(45px, 48px, 400),
//   $display-1:     mat.define-typography-level(34px, 40px, 400),
//   $headline: mat.define-typography-level(32px, 40px, 400), // h1
//   $title: mat.define-typography-level(24px, 28px, 500), // h2
//   $subheading-2: mat.define-typography-level(20px, 28px, 400), // h3
//   $subheading-1: mat.define-typography-level(18px, 24px, 400), // h4
//   $body-2: mat.define-typography-level(16px, 24px, 500),
//   $body-1: mat.define-typography-level(16px, 20px, 400),
//   $caption: mat.define-typography-level(14px, 20px, 400),
//   $button: mat.define-typography-level(16px, 16px, 500),
//   $input: mat.define-typography-level(inherit, 1.125, 400)
// );
```

Then in ./src you can create a styles.theme.scss that you import into your styles.scss file

Here's an example

```scss
/* You can add global styles to this file, and also import other style files */

// @use '../../../libs/shared/themes/buttons-theme' as buttons-theme;
// @use '../../../libs/shared/themes/dnd.theme.scss' as dnd-theme;
@use './scss/dnd.theme.scss' as dnd-theme;
@use './scss/global-colors.scss' as global-colors;

@use '@angular/material' as mat;

@include mat.core();

@mixin custom-component-themes($theme) {
  // Angular Material
  @include mat.all-component-themes($theme);

  // Custom
  // @include your-therme-here($theme);
  @include global-colors.color($theme);
}

// #############################################################################
// DND LIGHT THEME
// #############################################################################

$dnd-light-primary: mat.define-palette(dnd-theme.$primary-light, 700, 400, 900);
$dnd-light-accent: mat.define-palette(dnd-theme.$accent-light, 500, 300, 800);
$dnd-light-warn: mat.define-palette(dnd-theme.$warn-light, 500, 300, 700);

$dnd-light-theme: mat.define-light-theme((
  color: (
    primary: $dnd-light-primary,
    accent: $dnd-light-accent,
    warn: $dnd-light-warn
  ),
  // typography: dnd-theme.$typography-config,
  density: 0
));
.dnd-light-theme {
  @include custom-component-themes($dnd-light-theme);
}


// #############################################################################
// DND DARK THEME
// #############################################################################

$dnd-dark-primary: mat.define-palette(dnd-theme.$primary-dark, 300, 100, 500);
$dnd-dark-accent: mat.define-palette(dnd-theme.$accent-dark, 300, 100, 500);
$dnd-dark-warn: mat.define-palette(dnd-theme.$warn-dark, 300, 300, 700);

$dnd-dark-theme: mat.define-dark-theme((
  color: (
    primary: $dnd-dark-primary,
    accent: $dnd-dark-accent,
    warn: $dnd-dark-warn
  ),
  // typography: dnd-theme.$typography-config,
  density: 0
));
.dnd-dark-theme {
  @include custom-component-themes($dnd-dark-theme);
}
```

### Create Theme Service

- follow the [AddingRoutingLib.md Guide](./AddingRoutingLib.md) without the routing for core/theme
- create a service data-access/core-theme.service.ts

### Create Theme Components For Changing Your Theme
- create components/core-theme-picker
- create components/core-theme-toggle
