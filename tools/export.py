# /// script
# requires-python = ">=3.11"
# dependencies = ["pymupdf==1.28.2", "pillow==12.3.0"]
# ///
"""Export approved PDF regions into static portfolio assets."""

import argparse
from dataclasses import dataclass
import json
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


@dataclass(frozen=True)
class Work:
    id: str
    title: str
    category: str
    label: str
    description: str
    cover: list[float]
    pages: list[list[float]]


def render(document, region, width):
    number, x0, y0, x1, y1 = region
    if not (0 <= x0 < x1 <= 1 and 0 <= y0 < y1 <= 1):
        raise ValueError(f"Invalid crop on page {number}")
    page = document[int(number) - 1]
    bounds = page.rect
    clip = pymupdf.Rect(
        x0 * bounds.width,
        y0 * bounds.height,
        x1 * bounds.width,
        y1 * bounds.height,
    )
    zoom = width / clip.width
    pix = page.get_pixmap(
        matrix=pymupdf.Matrix(zoom, zoom),
        clip=clip,
        alpha=False,
        annots=False,
        colorspace=pymupdf.csRGB,
    )
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def save_image(image, path):
    image.save(path, format="WEBP", quality=88, method=6)
    return {"src": f"/assets/{path.name}", "width": image.width, "height": image.height}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Read-only source PDF")
    args = parser.parse_args()
    works = [
        Work(**value) for value in json.loads((ROOT / "content/works.json").read_text())
    ]
    if len({work.id for work in works}) != len(works):
        raise ValueError("Duplicate project identifier")
    output = ROOT / "static"
    assets = output / "assets"
    assets.mkdir(parents=True, exist_ok=True)
    for old in assets.glob("*.webp"):
        old.unlink()
    published = []
    with pymupdf.open(args.source) as document:
        for work in works:
            cover = render(document, work.cover, 1200)
            save_image(cover, assets / f"{work.id}-cover.webp")
            thumbnail = cover.copy()
            thumbnail.thumbnail((640, 6400), Image.Resampling.LANCZOS)
            save_image(thumbnail, assets / f"{work.id}-thumb.webp")
            images = [
                save_image(
                    render(document, region, 2000), assets / f"{work.id}-{i:02}.webp"
                )
                for i, region in enumerate(work.pages, 1)
            ]
            published.append(
                {
                    "id": work.id,
                    "title": work.title,
                    "category": work.category,
                    "label": work.label,
                    "description": work.description,
                    "images": images,
                }
            )
            print(f"Exported {work.id}: {len(images)} images", flush=True)
    destination = ROOT / "src/data/works.json"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(published, ensure_ascii=False, indent=2) + "\n")
    print(f"Exported {len(works)} projects to {output} and {destination}")


if __name__ == "__main__":
    main()
