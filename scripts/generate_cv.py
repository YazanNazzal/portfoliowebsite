"""Rebuild the two-page CV with its original Calibri fonts and navy/blue palette.

Install reportlab, then run: python scripts/generate_cv.py
Portfolio data supplies contact details, experience, skills, and project URLs.
"""

import json
import os
from pathlib import Path
from shutil import copyfile
from xml.sax.saxutils import escape

from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / "src/data/portfolio.ts").read_text(encoding="utf-8")
data = json.loads(source[source.index("{", source.index("export const")):].strip().removesuffix(";"))
personal = data["personal"]
projects = {project["id"]: project for project in data["projects"]}

# Full original font family, embedded so viewers never substitute fonts.
font_dir = Path(os.environ.get("CV_FONT_DIR", "C:/Windows/Fonts"))
pdfmetrics.registerFont(TTFont("Calibri", str(font_dir / "calibri.ttf")))
pdfmetrics.registerFont(TTFont("Calibri-Bold", str(font_dir / "calibrib.ttf")))
pdfmetrics.registerFontFamily("Calibri", normal="Calibri", bold="Calibri-Bold")

NAVY = "#0e2c4b"
HEADING = "#123a63"
BLUE = "#2f6fa8"
BODY = "#3a3f47"
MUTED = "#5b6470"
PAGE_W, PAGE_H = 595.2, 841.92
LEFT, RIGHT = 38, 557.2
WIDTH = RIGHT - LEFT
OUTPUT = ROOT / "output/pdf/Yazan_Nazzal_CV.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
pdf = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H))
pdf.setTitle("Yazan Nazzal - Software Engineer CV")
pdf.setAuthor(personal["name"])
pdf.setSubject("Software engineering, AI agents, web, mobile and desktop projects")


def clean(value):
    return escape(value.replace("\u2014", "-").replace("\u2013", "-").replace("\u2011", "-"))


def text(value, x, top, size=9.6, bold=False, color=BODY):
    pdf.setFont("Calibri-Bold" if bold else "Calibri", size)
    pdf.setFillColor(HexColor(color))
    pdf.drawString(x, PAGE_H - top - size, value)


def paragraph(markup, x, top, width=WIDTH, size=9.6, leading=12.2, color=BODY):
    style = ParagraphStyle("CV", fontName="Calibri", fontSize=size, leading=leading,
                           textColor=HexColor(color), spaceAfter=0)
    item = Paragraph(markup, style)
    _, height = item.wrap(width, PAGE_H)
    if top + height > PAGE_H - 34:
        raise ValueError(f"CV content overflows page: {markup[:80]}")
    item.drawOn(pdf, x, PAGE_H - top - height)
    return top + height


def section(label, top):
    text(" ".join(label.upper()), LEFT, top, 10.56, True, HEADING)
    pdf.setStrokeColor(HexColor(BLUE))
    pdf.setLineWidth(0.65)
    pdf.line(LEFT, PAGE_H - top - 16, RIGHT, PAGE_H - top - 16)
    return top + 23


def link(label, url):
    return f'<a href="{escape(url, {chr(34): "&quot;"})}" color="{BLUE}">{clean(label)}</a>'


def footer(number):
    text("Yazan Nazzal", LEFT, 815, 8.4, color=MUTED)
    pdf.setFillColor(HexColor(MUTED))
    pdf.setFont("Calibri", 8.4)
    pdf.drawRightString(RIGHT, PAGE_H - 823.4, f"{number} / 2")


def header():
    text(personal["name"], LEFT, 32, 24, True, NAVY)
    text("Software Engineer | AI Agentic Engineering", LEFT, 65, 9.6, color=MUTED)
    # Fixed label and value columns replace the old uneven right-aligned lines.
    for label, value, url, top in [
        ("Address:", personal["location"], None, 35),
        ("Phone:", personal["phone"], "tel:" + personal["phone"].replace(" ", ""), 49),
        ("Email:", personal["email"], "mailto:" + personal["email"], 63),
    ]:
        text(label, 357, top, 9.12, True, HEADING)
        paragraph(link(value, url) if url else clean(value), 394, top, RIGHT - 394,
                  size=9.12, leading=11.5, color=MUTED)
    profile_links = [
        link("GitHub: YazanNazzal", personal["github"]),
        link("LinkedIn: yazan-nazzal-dev", personal["linkedin"]),
        link("Portfolio", "https://portfoliowebsite-eta-teal.vercel.app/"),
    ]
    paragraph(" &nbsp; | &nbsp; ".join(profile_links), LEFT, 91, size=9.12, leading=12)
    pdf.setStrokeColor(HexColor(HEADING))
    pdf.setLineWidth(2)
    pdf.line(LEFT, PAGE_H - 113, RIGHT, PAGE_H - 113)


header()
y = section("Summary", 126)
y = paragraph(clean(
    "Software Engineer building full-stack web applications, Windows desktop experiences, mobile apps, "
    "and AI-powered tools. Develops LLM agents, MCP integrations, and RAG pipelines using Claude, OpenAI, "
    "and LangGraph. Hands-on work spans developer workspaces, e-commerce, booking platforms, and bilingual "
    "document AI, using React, Next.js, FastAPI, PostgreSQL, Flutter, and .NET Core. Focused on maintainable "
    "code, clear interfaces, and practical evaluation."
), LEFT, y)
y = section("Experience", y + 13)

experience_copy = {
    "freelance-ai-agentic": "Design and build AI agents, multi-agent workflows, and custom MCP integrations with REST APIs, databases, and files. Develop RAG pipelines with evaluation, guardrails, tracing, and cost controls. Use Codex, Claude Code, and Cursor with code review and testing.",
    "emicrolearn": "Built responsive interfaces and product features for the iBook digital learning platform. Collaborated across teams to improve performance and user experience while maintaining scalable React code.",
    "hexasol": "Developed React applications, led frontend work for the Hakini React Native project, and delivered the AZEZA mobile MVP. Contributed to code reviews and team knowledge sharing.",
    "iconnect": "Completed full-stack training in Angular and .NET Core, with practical projects covering API development, database design, and frontend-backend integration.",
}
for experience in data["experience"]:
    title = f'<b><font color="{NAVY}">{clean(experience["position"])}</font> - <font color="{BLUE}">{clean(experience["company"])}</font></b>'
    y = paragraph(title, LEFT, y, width=WIDTH - 110, size=10.56, leading=12.8)
    pdf.setFont("Calibri-Bold", 8.4)
    pdf.setFillColor(HexColor(MUTED))
    dates = f'{experience["startDate"]} - {experience["endDate"]}'
    pdf.drawRightString(RIGHT, PAGE_H - y + 3, dates)
    y = paragraph(clean(experience_copy[experience["id"]]), LEFT, y + 2)
    y += 8

y = section("Education", y + 2)
for label, value in [
    ("University", "Bachelor of Computer System Engineering - Arab American University, Jenin, Palestine"),
    ("High School", "Tawjihi (Scientific) - Qabatiya Secondary School, Jenin, Palestine"),
]:
    text(label, LEFT, y, 9.6, True, NAVY)
    y = paragraph(clean(value), LEFT + 78, y, WIDTH - 78) + 3

y = section("Skills", y + 8)
gap = 22
col_width = (WIDTH - gap) / 2
columns = [data["skills"][:6], data["skills"][6:]]
for col, groups in enumerate(columns):
    col_y = y
    x = LEFT + col * (col_width + gap)
    for group in groups:
        markup = f'<b><font color="{NAVY}">{clean(group["category"])}:</font></b> ' + clean(
            ", ".join(skill["name"] for skill in group["skills"]) + "."
        )
        pdf.setFillColor(HexColor(BLUE))
        pdf.circle(x + 2, PAGE_H - col_y - 5, 1.35, fill=1, stroke=0)
        col_y = paragraph(markup, x + 10, col_y, col_width - 10, size=9.12, leading=11.4) + 6
    print(f"Skills column {col + 1} ends at {col_y:.1f} pt")
footer(1)
pdf.showPage()

y = section("Projects", 34)
project_copy = {
    "devhub": "Developer command center for web and Windows (Electron): projects, Kanban, Markdown notes, clients, private team messaging, and community questions and replies. Read-only GitHub/Vercel/Render integrations, website monitoring, and a Python worker. Next.js, FastAPI, PostgreSQL.",
    "forme-commerce": "Customizable bilingual storefront and owner dashboard with product variants, inventory, discounts, and cash-on-delivery checkout. Next.js, TypeScript, PostgreSQL, Zustand, Zod, and Sharp; Android/iOS hosted-store wrappers.",
    "blossom-dreams": "Live salon website with treatment browsing, appointment booking, an admin workspace, and Resend email confirmations. FastAPI and PostgreSQL; account-free booking recovery with email verification.",
    "king-of-shisha": "Arabic RTL online store with product browsing, cart, order submission, and an admin dashboard. React frontend with a Supabase backend and responsive product images.",
    "warraq-pdf-assistant": "Arabic/English document assistant for PDF, Word, TXT, and PowerPoint. Combines BM25 and Gemini semantic retrieval, query rewriting, and reranking to produce answers with document source references.",
    "apartment-reservation": "Graduation project rebuilt with Flutter, Riverpod, GoRouter, and Firebase. Student/owner workflows cover housing search, reservations, approvals, participant chat, notifications, and reviews.",
    "math-tutor-website": "Browser-only feedback design studio with 23 templates, local portraits, Arabic/English layouts, and multi-page 1080 x 1920 PNG Story exports. React, TypeScript, and Canvas API.",
    "employees-api": "ASP.NET Core 6 REST API for employees, companies, and employee transfers. C#, Entity Framework Core, SQL Server, code-first migrations, and Swagger.",
}
for project_id, description in project_copy.items():
    project = projects[project_id]
    y = paragraph(f'<b><font color="{NAVY}">{clean(project["title"])}</font></b>', LEFT, y,
                  size=10.56, leading=13)
    y = paragraph(clean(description), LEFT, y + 2)
    links = []
    if project.get("liveUrl"):
        links.append(link("Live website", project["liveUrl"]))
    if project.get("githubUrl"):
        links.append(link("Source code", project["githubUrl"]))
    if project.get("desktopUrl"):
        links.append(link("Windows download", project["desktopUrl"]))
    if links:
        y = paragraph(" &nbsp; | &nbsp; ".join(links), LEFT, y + 2, size=9.12, leading=11.5)
    y += 8

y = paragraph(f'<b><font color="{NAVY}">Additional work:</font></b> ' + " &nbsp; | &nbsp; ".join([
    link("Personal Portfolio", projects["portfolio-website"]["githubUrl"]),
    link("Hakini - Arabic Login UI", projects["hakini-screen"]["githubUrl"]),
    "ReactJS Admin Dashboard POC",
]), LEFT, y, size=9.12, leading=11.5)

y = section("Languages", y + 13)
y = paragraph(clean(" | ".join(f'{item["name"]}: {item["proficiency"]}' for item in data["languages"])), LEFT, y)
y = section("References", y + 13)
for reference in data["references"]:
    y = paragraph(f'<b><font color="{NAVY}">{clean(reference["name"])}</font></b> - '
                  + clean(reference["title"]) + " &nbsp; | &nbsp; "
                  + link(reference["email"], "mailto:" + reference["email"]), LEFT, y, size=9.12, leading=11.5) + 4
print(f"Page 2 ends at {y:.1f} pt")
footer(2)
pdf.save()
copyfile(OUTPUT, ROOT / "public/Yazan_Nazzal_CV.pdf")
print(f"Generated {OUTPUT} and refreshed the website download.")
