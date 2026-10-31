import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
const section = html.match(/<section[^>]+id="service"[\s\S]*?<\/section>/)?.[0];

test("academic service lists only the six confirmed venues, with full names and official links", () => {
    assert.ok(section);
    const names = [
        "IEEE Transactions on Geoscience and Remote Sensing",
        "IEEE Transactions on Aerospace and Electronic Systems",
        "IEEE Geoscience and Remote Sensing Letters",
        "IEEE Sensors Journal",
        "IEEE SENSORS Conference",
        "IEEE International Conference on Acoustics, Speech, and Signal Processing"
    ];
    const links = [...section.matchAll(/<a href="(https:[^"]+)" target="_blank" rel="noopener">([^<]+)<\/a>/g)];
    assert.deepEqual(links.map((link) => link[2]), names);
    assert.equal((section.match(/<li>/g) || []).length, 6);
    assert.match(html, /href="#service" data-i18n="navService"/);
    assert.match(section, /aria-labelledby="serviceTitle"/);
});

test("academic service navigation and section labels are available in both languages", () => {
    const script = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
    const translations = script.match(/const translations = ([\s\S]*?);\s*const publications/)[1];
    const labels = vm.runInNewContext(`(${translations})`);
    const keys = ["navService", ...[...section.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1])];
    for (const lang of ["en", "zh"]) {
        for (const key of keys) assert.ok(labels[lang][key], `${lang}.${key}`);
    }
    assert.equal(labels.zh.serviceJournals, "期刊审稿");
    assert.equal(labels.zh.serviceConferences, "会议审稿");
});
