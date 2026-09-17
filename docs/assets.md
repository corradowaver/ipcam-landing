# Графические ассеты

## Производственная линия

Источник утверждённого макета:
`../mockup-cozy/assets/factory-production.webp`.

Исторический 2D-ассет. Удалён из React; оригинал сохранён в каталоге макета.

Прежнее назначение: главный экран и раздел «О компании». В актуальном интерфейсе используются фотографии CCTV.
Иллюстрация показывает
производственную линию, паллеты с коробками и трёх сотрудников в одинаковой
лавандовой форме. Два сотрудника в жёлтых касках выделяются мятными рамками,
сотрудник без каски — розовой пунктирной рамкой. Рамки накладываются отдельным
слоем интерфейса.

Промпт ImageGen: плоская минималистичная 2D-иллюстрация производственного цеха в
пастельной палитре проекта; горизонтальный конвейер с коробками, паллеты по краям,
три человека в одинаковой лавандовой форме, двое в жёлтых касках и один без каски;
небольшая ненавязчивая камера в верхнем углу; крупные формы, минимум деталей, без
текста, градиентов, 3D и фотореализма.

## Камера → AI → dashboard

Источник утверждённого макета: `../mockup-cozy/assets/flow-production.webp`.

Исторический 2D-ассет. Удалён из React; оригинал сохранён в каталоге макета.

Прежнее назначение: секция «Как это работает». В актуальном React и макете
её заменяет HTML/SVG-схема. Слева показана камера, в центре — блок AI,
справа — окно dashboard с производственной сценой и схематичной панелью событий.

Промпт ImageGen: плоская минималистичная 2D-схема «камера → AI → dashboard» в
пастельной палитре проекта; dashboard занимает около половины композиции и
показывает производственный кадр с рамками вокруг людей и узкой панелью событий;
простые крупные формы, минимум деталей, без вымышленных метрик, мелкого текста,
декоративных микросхем, 3D и фотореализма.

## Шрифт

`../src/shared/assets/onest.woff2`, `onest-latin-ext.woff2`, `onest-latin.woff2` —
вариативный Onest: кириллица, расширенная латиница и латиница со знаками. Все три
набора извлечены из утверждённого автономного макета; `unicode-range` совпадает
с исходником. Локальное подключение сохраняет
типографику без сетевого запроса к CDN.

## Фотографии для предложения главной

Созданы через ImageGen 15 сентября 2026 года. Только для новой главной HTML-макета;
в React не используются. С 16 сентября заменены в макете версиями `*-cctv.webp`;
прежние файлы сохранены для сравнения. Каждый кадр — синтетическая демонстрация,
а не фотография внедрения или клиента. Интерфейс, текст и рамки добавляются
отдельно средствами HTML/CSS.

Все изображения имеют размер 1536 × 1024. WebP: качество 83, method 6;
PNG-оригиналы сохранены без изменений.

| Файл в `mockup-cozy/assets/` | Назначение                                     | WebP, байт |
| ---------------------------- | ---------------------------------------------- | ---------: |
| `factory-hero.webp`          | Главный кадр и результат в схеме анализа       |    121 062 |
| `factory-case.webp`          | Сценарий производственного цеха, другой ракурс |    120 388 |
| `warehouse-case.webp`        | Сценарий склада с сотрудниками и паллетами     |    168 076 |
| `construction-case.webp`     | Сценарий строительной площадки                 |    137 132 |

Для каждого WebP рядом находится `<имя>-original.png`. Точные промпты также
сохранены в [photo-prompts.json](../mockup-cozy/assets/photo-prompts.json).

### factory-hero — промпт

```text
Use case: photorealistic-natural. Asset type: industrial editorial photograph for the Russian B2B video analytics website 'Vmeste'. Style: premium documentary industrial photography, natural diffused daylight, credible materials and spatial proportions, calm cool grey and warm off-white palette, understated lavender workwear and yellow protective helmets, subtly desaturated colours, realistic skin and hands, fine photographic texture. No text, logos, watermarks, bounding boxes, diagrams, graphic overlays or UI. NOT an illustration, not a 3D render, not a staged team portrait. Landscape 3:2 composition. Show a modern small packaging factory with a conveyor carrying brown cardboard boxes horizontally across the foreground, pallets and boxes near its ends. Exactly THREE adult employees well separated across the middle of frame, visible from head to below the waist: worker at left wearing a yellow hard hat, worker in middle WITHOUT any helmet or hat and with clearly visible hair, worker at right wearing a yellow hard hat. All three in muted grey-lavender practical workwear, naturally working with boxes, nobody looking into the camera. Heads must be unobscured and well separated so UI detection frames can be added later. Camera is at a slightly elevated observation angle but close enough that people are large and legible; wide windowed industrial space softly recedes behind them. Keep all three people within the central 85 percent of the image. Natural plausible machinery without excessive visual clutter.
```

### factory-case — промпт

```text
Use case: photorealistic-natural. Asset type: industrial editorial photograph for the Russian B2B video analytics website 'Vmeste'. Style: premium documentary industrial photography, natural diffused daylight, credible materials and spatial proportions, calm cool grey and warm off-white palette, understated lavender workwear and yellow protective helmets, subtly desaturated colours, realistic skin and hands, fine photographic texture. No text, logos, watermarks, bounding boxes, diagrams, graphic overlays or UI. NOT an illustration, not a 3D render, not a staged team portrait. Landscape 3:2 composition. A different candid angle inside a windowed packaging factory: a long diagonal conveyor with natural brown cardboard boxes, two workers in pale grey-lavender workwear with yellow hard hats quietly checking the packaging line. Composition is spacious and architectural, with depth through repeated steel beams and industrial windows, human activity in the middle distance. Avoid bright high visibility vests; documentary quality.
```

### warehouse-case — промпт

```text
Use case: photorealistic-natural. Asset type: industrial editorial photograph for the Russian B2B video analytics website 'Vmeste'. Style: premium documentary industrial photography, natural diffused daylight, credible materials and spatial proportions, calm cool grey and warm off-white palette, understated lavender workwear and yellow protective helmets, subtly desaturated colours, realistic skin and hands, fine photographic texture. No text, logos, watermarks, bounding boxes, diagrams, graphic overlays or UI. NOT an illustration, not a 3D render, not a staged team portrait. Landscape 3:2 composition. A working warehouse aisle with tall grey industrial shelves, neatly arranged cardboard boxes and wooden pallets, two warehouse employees in muted grey workwear and yellow hard hats walking naturally beside a pallet trolley. View diagonally down the aisle, light from high windows, gentle deep perspective and calm real textures. Keep employees away from edges for flexible cropping. No forklift in active motion.
```

### construction-case — промпт

```text
Use case: photorealistic-natural. Asset type: industrial editorial photograph for the Russian B2B video analytics website 'Vmeste'. Style: premium documentary industrial photography, natural diffused daylight, credible materials and spatial proportions, calm cool grey and warm off-white palette, understated lavender workwear and yellow protective helmets, subtly desaturated colours, realistic skin and hands, fine photographic texture. No text, logos, watermarks, bounding boxes, diagrams, graphic overlays or UI. NOT an illustration, not a 3D render, not a staged team portrait. Landscape 3:2 composition. A wide architectural view of a construction site inside a partially completed concrete industrial building, repeated columns receding diagonally, stacked building materials in orderly zones, two engineers in muted grey workwear and yellow hard hats reviewing the work in the middle distance. Soft overcast daylight, subtly warm concrete and cool steel, pale muted accents, expansive calm horizontal composition. No dramatic machinery, advertising, readable signs or text.
```

## Кадры с ракурса видеонаблюдения

Созданы 16 сентября 2026 года встроенным ImageGen в режиме редактирования
по четырём фотографиям первого этапа. Ракурс — сверху со стационарной точки;
люди работают, не улыбаются и не позируют. Все изображения синтетические,
без впечатанных рамок, подписей и интерфейса.

| Файл в `mockup-cozy/assets/`  | Назначение                                                     | WebP, байт |
| ----------------------------- | -------------------------------------------------------------- | ---------: |
| `factory-hero-cctv.webp`      | Главная, схема анализа, демонстрация контроля касок на услугах |    226 546 |
| `factory-case-cctv.webp`      | Сценарий цеха на главной и в кейсах, услуги, о компании        |    222 970 |
| `warehouse-case-cctv.webp`    | Склад на главной и в кейсах                                    |    178 814 |
| `construction-case-cctv.webp` | Стройплощадка на главной и в кейсах                            |    269 734 |

Размер каждого — 1536 × 1024. Оптимизация: WebP quality 83 / method 6.
PNG-оригиналы `*-cctv-original.png` сохранены рядом без изменений.
Полный набор промптов: [cctv-prompts.json](../mockup-cozy/assets/cctv-prompts.json).

### factory-hero-cctv — промпт

Референс: `mockup-cozy/assets/factory-hero.webp`.

```text
Use case: photorealistic-natural. Edit the reference scene into a realistic high-quality fixed security camera frame. Critical change: camera is mounted in an upper corner of the industrial space, 4 metres above the floor, looking downward at approximately 40 degrees. Show clearly visible tops of heads, boxes and machinery and more of the floor. This MUST look like an elevated surveillance viewpoint, not a photographer at eye level. Sharp deep focus across the scene, modern high-resolution colour CCTV quality, natural diffuse daylight, no fisheye or artificial video noise. Retain the reference's quiet desaturated grey-lavender workwear, warm cardboard, neutral industrial materials and yellow helmets. Workers have neutral concentrated faces, no smiles, no looking into the camera, no posing; they are absorbed in a specific physical work task. Landscape 3:2 image, no text, timestamp, logo, watermark, interface or bounding boxes. Keep the same packaging line and EXACTLY three employees separated left, middle, right. Left and right wear yellow hard hats, the middle woman has visible hair and NO helmet. They handle boxes on the conveyor. Show all three clearly from above, heads and bodies fully inside the frame, heads across the middle band of the image and generous margin to edges. A legible observed scene for later detection rectangles.
```

### factory-case-cctv — промпт

Референс: `mockup-cozy/assets/factory-case.webp`.

```text
Use case: photorealistic-natural. Edit the reference scene into a realistic high-quality fixed security camera frame. Critical change: camera is mounted in an upper corner of the industrial space, 4 metres above the floor, looking downward at approximately 40 degrees. Show clearly visible tops of heads, boxes and machinery and more of the floor. This MUST look like an elevated surveillance viewpoint, not a photographer at eye level. Sharp deep focus across the scene, modern high-resolution colour CCTV quality, natural diffuse daylight, no fisheye or artificial video noise. Retain the reference's quiet desaturated grey-lavender workwear, warm cardboard, neutral industrial materials and yellow helmets. Workers have neutral concentrated faces, no smiles, no looking into the camera, no posing; they are absorbed in a specific physical work task. Landscape 3:2 image, no text, timestamp, logo, watermark, interface or bounding boxes. Keep a packaging production line, two helmeted employees checking and handling boxes. Reconstruct from the upper opposite corner looking obliquely down the conveyor. Both people are working, heads tilted toward boxes, no portraits. Include floor lanes, pallet tops, and conveyor machinery from above.
```

### warehouse-case-cctv — промпт

Референс: `mockup-cozy/assets/warehouse-case.webp`.

```text
Use case: photorealistic-natural. Edit the reference scene into a realistic high-quality fixed security camera frame. Critical change: camera is mounted in an upper corner of the industrial space, 4 metres above the floor, looking downward at approximately 40 degrees. Show clearly visible tops of heads, boxes and machinery and more of the floor. This MUST look like an elevated surveillance viewpoint, not a photographer at eye level. Sharp deep focus across the scene, modern high-resolution colour CCTV quality, natural diffuse daylight, no fisheye or artificial video noise. Retain the reference's quiet desaturated grey-lavender workwear, warm cardboard, neutral industrial materials and yellow helmets. Workers have neutral concentrated faces, no smiles, no looking into the camera, no posing; they are absorbed in a specific physical work task. Landscape 3:2 image, no text, timestamp, logo, watermark, interface or bounding boxes. Keep this warehouse, two helmeted workers and a loaded manual pallet trolley. View from a fixed upper aisle corner, looking down at the trolley, tops of boxes and floor. One worker pulls the trolley and the other checks a package beside it, heads directed at the work. No smiling, no strolling toward the photographer.
```

### construction-case-cctv — промпт

Референс: `mockup-cozy/assets/construction-case.webp`.

```text
Use case: photorealistic-natural. Edit the reference scene into a realistic high-quality fixed security camera frame. Critical change: camera is mounted in an upper corner of the industrial space, 4 metres above the floor, looking downward at approximately 40 degrees. Show clearly visible tops of heads, boxes and machinery and more of the floor. This MUST look like an elevated surveillance viewpoint, not a photographer at eye level. Sharp deep focus across the scene, modern high-resolution colour CCTV quality, natural diffuse daylight, no fisheye or artificial video noise. Retain the reference's quiet desaturated grey-lavender workwear, warm cardboard, neutral industrial materials and yellow helmets. Workers have neutral concentrated faces, no smiles, no looking into the camera, no posing; they are absorbed in a specific physical work task. Landscape 3:2 image, no text, timestamp, logo, watermark, interface or bounding boxes. Keep this unfinished concrete industrial building, stacked materials and two helmeted workers. View from an upper column-mounted camera looking obliquely DOWN from 4 metres, across the floor and tops of stacked materials. Two workers busy inspecting a component and a plan on a work surface, neutral expressions, no posing. Preserve the repeating concrete structural rhythm.
```

## Ассеты актуального React-приложения

В `src/shared/assets/scenes/` лежат побайтовые копии четырёх выбранных
`*-cctv.webp` из `mockup-cozy/assets/`. В именах приложения опущен суффикс
`-cctv`; исходники и промпты сохранены в макете. Vite формирует локальные URL
с хешами; загрузка изображений и шрифта не требует внешних сервисов.
Фотографии одинаковые в обеих темах. Главный кадр загружается приоритетно,
остальные кадры ниже первого экрана — лениво. Рамки и переключатель анализа
реализованы отдельным React/CSS-слоем.
