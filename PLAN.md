# Implementation Plan: Anna Collection & Routing Setup

1.  **Refactor Routing & App Structure**:
    -   Currently, `App.tsx` contains the entire `Imperial` collection landing page.
    -   Action: Add `react-router-dom` to handle multiple pages effectively (`/`, `/anna`, etc.).
    -   Move the current landing page content (which represents the Imperial Collection and the main site) into a dedicated `pages/Home.tsx` component.
    -   Update `App.tsx` to serve as the main router layout.

2.  **Create Anna Collection Page**:
    -   Build `pages/AnnaCollection.tsx`.
    -   This page will showcase only the dresses from `Collection.ANNA`.
    -   We need to reuse the `CollectionGrid` but filter the dresses.
    -   The page needs a distinct hero/header section to set the mood for the Anna collection (romantic, pure, ethereal).
    -   Ensure all interaction handlers (Details Modal, Wardrobe, Try-On) work correctly by passing down the necessary state or moving them to a higher level (like a context or keeping them in the root if appropriate for global wardrobe).

3.  **Update Navigation (Navbar & Footer)**:
    -   Update `Navbar.tsx` to include clear links separating the collections: "Imperial", "Anna", (and later "Mayra", "Beverly").
    -   Ensure the user can easily switch between them without getting stuck or confused.

4.  **Complete Image Generation for Anna Collection**:
    -   We started generating sketches for the Anna collection, but hit capacity limits.
    -   List of pending sketches: Anaria, Anastasia, Anastea, Anatolia, Anelie, Anamaria, Annabelle, Anavelle, Just Anna, Annette.
    -   *Constraint*: The image API capacity is currently exhausted and dropping errors. We will periodically retry or proceed with placeholders/skip sketches temporarily if it blocks code deployment.
    -   Once generated, update the `constants.ts` with the new sketch paths.

5.  **Generate AI Video for Anna Collection (Final Step)**:
    -   As requested by the user, draft a concept for a short video showcasing the Anna collection aura.
    -   We will need to use a specialized video command/capability or prepare assets for it.

6.  **Style & Polish**:
    -   Make sure `AnnaCollection.tsx` aligns flawlessly with the site's rich, vintage-pastel aesthetic.
    -   Verify that no images are cropped (maintaining `object-contain bg-white`).

## Tasks breakdown:
- [ ] Install `react-router-dom`.
- [ ] Create `Home.tsx` and move current `App.tsx` layout there.
- [ ] Create `AnnaCollection.tsx`.
- [ ] Update `App.tsx` with Router setup.
- [ ] Update `Navbar` with new links.
- [ ] Retry pending image generation (Anna sketches).
- [ ] Review and prepare for video generation.
