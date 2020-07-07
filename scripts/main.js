/*
	Copyright (c) DeltaNedas 2020

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

(() => {

const rtfm = require("rtfm/library");
require("rtfm/docs");

const setup = run(() => {
	const dialog = new FloatingDialog("$rtfm.manual-pages");

	const pages = new Table();
	const pane = new ScrollPane(pages);
	dialog.cont.add(pane);
	Core.app.post(run(() => Core.scene.setScrollFocus(pane)));

	for (var name in rtfm.pages) {
		rtfm.pages[name].button(pages, name);
	}

	dialog.addCloseButton();
	dialog.show();
});

const addButton = () => {
	// AboutDialog clears after 1 tick, so this waits 2
	Vars.ui.about.shown(run(() => Time.run(2, run(() => {
		Vars.ui.about.buttons.addButton("$rtfm.manuals", setup)
			.size(200, 64).name("manuals");
	}))));
};

if (Vars.ui.about) {
	/* Not loaded on game start, check for old button */
	if (!Vars.ui.about.cells.find(boolf(cell => cell.get().name == "manuals"))) {
		addButton();
	}
} else {
	Events.on(EventType.ClientLoadEvent, run(addButton));
}

})();
