/* =========================================================
   Martina & Honza — svatební web
   JS: navigace, animace, Cloudinary upload
   ========================================================= */

/* ---------- KONFIGURACE CLOUDINARY ----------
   Po vytvoření Cloudinary účtu (viz NÁVOD.md, krok 4):
     1. Otevři Settings → Account → zkopíruj "Cloud name"
     2. Settings → Upload → Add upload preset → zvol "Unsigned" → zkopíruj název
     3. Dosaď oba sem dolů a ulož.
*/
const CLOUDINARY_CLOUD_NAME = 'TVUJ_CLOUD_NAME';
const CLOUDINARY_UPLOAD_PRESET = 'TVUJ_UPLOAD_PRESET';
const CLOUDINARY_FOLDER = 'svatba-martina-honza'; // do tohoto folderu se budou fotky řadit
/* ---------------------------------------------- */


/* ---------- NAVIGACE: scroll + mobilní menu ---------- */
const nav = document.getElementById('nav');
const navToggle = document.querySelector('.nav-toggle');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

navToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Po kliknutí na položku menu zavři mobilní menu
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
    });
});


/* ---------- ANIMACE: fade-in při scrollu ---------- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section-inner, .timeline-item, .info-card, .contact-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});


/* ---------- CLOUDINARY UPLOAD WIDGET ---------- */
const uploadBtn = document.getElementById('upload-btn');
const uploadStatus = document.getElementById('upload-status');

function setStatus(message, kind = 'info') {
    if (!uploadStatus) return;
    uploadStatus.textContent = message;
    uploadStatus.style.color = kind === 'error'
        ? '#a04a4a'
        : kind === 'success'
            ? 'var(--color-accent-dark)'
            : 'var(--color-muted)';
}

function isCloudinaryConfigured() {
    return CLOUDINARY_CLOUD_NAME && CLOUDINARY_CLOUD_NAME !== 'TVUJ_CLOUD_NAME'
        && CLOUDINARY_UPLOAD_PRESET && CLOUDINARY_UPLOAD_PRESET !== 'TVUJ_UPLOAD_PRESET';
}

let widget = null;

function openUpload() {
    if (!isCloudinaryConfigured()) {
        setStatus('Upload zatím není nastaven. Doplníme po nasazení webu (viz NÁVOD.md).', 'error');
        return;
    }
    if (typeof cloudinary === 'undefined') {
        setStatus('Upload se ještě načítá, zkuste to za chvíli.', 'error');
        return;
    }

    if (!widget) {
        widget = cloudinary.createUploadWidget({
            cloudName: CLOUDINARY_CLOUD_NAME,
            uploadPreset: CLOUDINARY_UPLOAD_PRESET,
            folder: CLOUDINARY_FOLDER,
            sources: ['local', 'camera'],
            multiple: true,
            maxFiles: 10,
            maxFileSize: 15_000_000, // 15 MB / fotka
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'heic', 'webp'],
            language: 'cs',
            text: {
                cs: {
                    or: 'nebo',
                    menu: {
                        files: 'Z telefonu / počítače',
                        camera: 'Vyfotit',
                    },
                    selection_counter: { selected: 'Vybráno' },
                    actions: {
                        upload: 'Nahrát',
                        clear_all: 'Smazat vše',
                        log_out: 'Odhlásit',
                    },
                    local: {
                        browse: 'Vybrat',
                        dd_title_single: 'Přetáhněte fotku sem',
                        dd_title_multi: 'Přetáhněte fotky sem',
                        drop_title_single: 'Pusťte fotku pro nahrání',
                        drop_title_multiple: 'Pusťte fotky pro nahrání',
                    },
                    camera: {
                        capture: 'Vyfotit',
                        cancel: 'Zrušit',
                        take_pic: 'Vyfotit',
                        explanation: 'Povolte přístup ke kameře.',
                        camera_error: 'Nelze otevřít kameru.',
                        retry: 'Zkusit znovu',
                        file_name: 'Camera_{{ts}}',
                    },
                    notifications: {
                        general_error: 'Něco se pokazilo, zkuste to znovu.',
                        general_prompt: 'Pokračovat?',
                        limit_reached: 'Nelze přidat víc souborů.',
                        invalid_add_url: 'URL musí být platná.',
                        invalid_public_id: 'Neplatné jméno souboru.',
                        no_new_files: 'Soubory byly už nahrány.',
                        retry_failed: 'Některé soubory se nepovedlo nahrát.',
                        file_size_error: 'Soubor je moc velký (max 15 MB).',
                        file_type_error: 'Tento typ souboru nepodporujeme.',
                    },
                    queue: {
                        title: 'Nahrávání',
                        title_uploading_with_counter: 'Nahrávám {{num}} souborů',
                        title_uploading: 'Nahrávám soubory',
                        mini_title: 'Nahráno',
                        mini_title_uploading: 'Nahrávám',
                        show_completed: 'Zobrazit dokončené',
                        retry_failed: 'Zkusit znovu nahrát',
                        abort_all: 'Zrušit vše',
                        upload_more: 'Nahrát další',
                        done: 'Hotovo',
                        statuses: {
                            uploading: 'Nahrávám…',
                            error: 'Chyba',
                            uploaded: 'Hotovo',
                            aborted: 'Zrušeno',
                        },
                    },
                },
            },
            styles: {
                palette: {
                    window: '#FAF8F3',
                    sourceBg: '#F2EFE7',
                    windowBorder: '#D8D2C5',
                    tabIcon: '#6E7E5F',
                    inactiveTabIcon: '#6E6A63',
                    menuIcons: '#2D2D2D',
                    link: '#6E7E5F',
                    action: '#2D2D2D',
                    inProgress: '#8A9A7B',
                    complete: '#6E7E5F',
                    error: '#A04A4A',
                    textDark: '#2D2D2D',
                    textLight: '#FFFFFF',
                },
                fonts: {
                    "'Lato', sans-serif": 'https://fonts.googleapis.com/css?family=Lato',
                },
            },
        }, (error, result) => {
            if (error) {
                console.error(error);
                setStatus('Něco se pokazilo při nahrávání. Zkuste to prosím znovu.', 'error');
                return;
            }
            if (result && result.event === 'success') {
                setStatus(`Fotka „${result.info.original_filename}" se nahrála. Děkujeme!`, 'success');
            }
            if (result && result.event === 'queues-end') {
                setStatus('Všechny fotky nahrány — díky moc!', 'success');
            }
        });
    }

    widget.open();
}

uploadBtn?.addEventListener('click', openUpload);


/* ---------- AKTUÁLNÍ ROK V PATIČCE (volitelné) ---------- */
// Pokud bys v patičce někdy chtěl rok automaticky, použij:
// document.getElementById('year').textContent = new Date().getFullYear();
