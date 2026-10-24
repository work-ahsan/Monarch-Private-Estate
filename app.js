(function(){
  'use strict';
  var h=React.createElement;
  var D=window.MONARCH_DATA;
  var properties=D.properties,journal=D.journal,locations=D.locations,advisors=D.advisors,services=D.services;

  function cx(){return Array.prototype.slice.call(arguments).filter(Boolean).join(' ')}
  function FragmentCompat(props){return props.children}
  function pageHref(page){return page==='home'?'index.html':page+'.html'}

  function Brand(){return h('a',{className:'brand page-link',href:'index.html','aria-label':'Monarch Private Estates — home'},
    h('span',{className:'brand-mark-wrap'},h('span',{className:'brand-mark'},'M')),
    h('span',{className:'brand-copy'},h('b',null,'MONARCH'),h('small',null,'PRIVATE ESTATES'))
  )}

  function Header(props){
    var nav=[['collection','Collection'],['journal','Journal'],['locations','Locations'],['house','Our House']];
    return h('div',{className:'header-shell'},
      h('header',{className:'site-header'},h(Brand),
        h('nav',{className:'desktop-nav'},nav.map(function(n){return h('a',{key:n[0],className:cx('page-link',props.page===n[0]&&'active'),href:pageHref(n[0])},n[1])})),
        h('button',{className:'header-cta magnetic',onClick:props.openInquiry},'Private inquiry ',h('span',null,'↗')),
        h('button',{className:'menu-toggle',onClick:props.toggleMenu,'aria-label':'Open menu','aria-expanded':props.menu?'true':'false'},h('span'),h('span'))
      ),
      props.menu&&h('aside',{className:'mobile-menu open'},h('div',{className:'mobile-menu-inner'},h('p',{className:'eyebrow'},'Navigate'),
        nav.map(function(n,i){return h('a',{key:n[0],className:'page-link',href:pageHref(n[0])},h('span',null,n[1]),h('em',null,'0'+(i+1)))}),
        h('button',{onClick:props.openInquiry},'Request private access ↗')))
    )
  }

  function SectionLabel(props){return h('div',{className:cx('section-label reveal',props.light&&'light')},h('span',null,props.n),h('p',null,props.children))}

  function HomeHero(){var p=properties[0];return h('section',{className:'hero',id:'top','data-scene-name':'Opening'},
    h('div',{className:'hero-media',style:{backgroundImage:"linear-gradient(90deg,rgba(10,10,8,.40),rgba(10,10,8,.04)),url('"+p.image+"')"}}),h('div',{className:'hero-vignette'}),h('div',{className:'hero-grid-lines'}),
    h('div',{className:'hero-copy'},h('p',{className:'eyebrow hero-kicker'},'A private collection · 2026'),
      h('h1',null,h('span',{className:'hero-line'},h('i',null,'Live'),' beyond'),h('span',{className:'hero-line hero-line-indent'},'the ',h('i',null,'expected.'))),
      h('div',{className:'hero-bottom'},h('p',null,'Rare residences, quietly represented.',h('br'),'Selected for architecture, atmosphere and place.'),h('a',{className:'round-link magnetic page-link',href:'collection.html'},h('span',null,'Explore',h('br'),'collection'),h('b',null,'↗')))),
    h('div',{className:'hero-index'},h('span',null,'01'),h('i'),h('span',null,'05')),
    h('div',{className:'hero-property-tag glass'},h('span',null,'Now presenting'),h('strong',null,p.title),h('small',null,p.location+' · '+p.shortPrice)),
    h('div',{className:'scroll-cue'},h('span',null,'Scroll to enter'),h('i'))
  )}

  function InnerHero(props){return h('section',{className:cx('inner-hero',props.dark&&'dark'),'data-scene-name':props.scene||props.kicker},
    props.image&&h('div',{className:'inner-hero-media',style:{backgroundImage:"linear-gradient(90deg,rgba(12,12,10,.62),rgba(12,12,10,.16)),url('"+props.image+"')"}}),
    h('div',{className:'inner-hero-grid pad-x'},
      h('div',{className:'inner-hero-copy'},h('p',{className:'eyebrow'},props.kicker),h('h1',null,props.lines.map(function(line,i){return h('span',{key:i,className:i===props.italic?'italic':''},line)})),h('p',{className:'inner-hero-deck'},props.deck)),
      h('div',{className:'inner-hero-meta'},h('span',null,props.index||'MPE / 2026'),h('p',null,props.meta||'Private estates · globally represented'))
    ),h('div',{className:'inner-scroll-cue'},'Scroll to discover ',h('span',null,'↓'))
  )}

  function Manifesto(){return h('section',{className:'manifesto pad-x','data-scene-name':'The House'},h(SectionLabel,{n:'01'},'The house'),
    h('div',{className:'manifesto-copy'},h('p',{className:'big-serif reveal'},"We don't list everything."),h('p',{className:'big-serif muted reveal'},'Only what we would keep.'),
      h('div',{className:'manifesto-detail reveal'},h('p',null,'Monarch represents a deliberately small collection of exceptional homes — residences with a clear point of view, remarkable provenance, and a sense of place that cannot be replicated.'),h('a',{className:'page-link',href:'house.html'},'Discover our approach ',h('span',null,'↗')))),
    h('div',{className:'stats'},[['28','Private residences'],['11','Global enclaves'],['€310M','Collection value'],['1:1','Private representation']].map(function(x){return h('div',{className:'reveal',key:x[1]},h('strong',null,x[0]),h('span',null,x[1]))}))
  )}

  function PropertyCard(props){var p=props.p;return h('article',{className:cx('property-card reveal',props.featured&&'featured',props.wide&&'wide',props.offset&&'offset'),onClick:function(){props.open(p)},role:'button',tabIndex:0,onKeyDown:function(e){if(e.key==='Enter'||e.key===' ')props.open(p)},'aria-label':'Open '+p.title+' dossier'},
    h('div',{className:'property-media'},h('img',{src:p.image,alt:p.title,loading:'lazy'}),h('div',{className:'image-wash'}),h('span',{className:'property-number'},p.number),h('div',{className:'property-badges'},h('span',null,p.status)),h('span',{className:'property-arrow'},'↗')),
    h('div',{className:'property-info'},h('div',null,h('p',null,p.location),h('h3',null,p.title)),(props.featured||props.wide)?h('div',{className:'property-spec'},h('span',null,p.beds+' Beds'),h('span',null,p.baths+' Baths'),h('span',null,p.area+' m²')):null,h('strong',null,p.price))
  )}

  function FeaturedCollection(props){return h('section',{className:'collection home-collection',id:'collection','data-scene-name':'Private Collection'},
    h('div',{className:'collection-head pad-x'},h(SectionLabel,{n:'02'},'Private collection'),h('div',{className:'collection-title-wrap'},h('h2',{className:'reveal'},'Residences with',h('br'),h('i',null,'presence.')),h('a',{className:'text-link reveal page-link',href:'collection.html'},'View all residences ',h('span',null,'↗')))),
    h('div',{className:'property-list pad-x'},h('div',{className:'all-properties'},h(PropertyCard,{p:properties[0],featured:true,open:props.open}),h('div',{className:'property-pair'},h(PropertyCard,{p:properties[1],open:props.open}),h(PropertyCard,{p:properties[2],offset:true,open:props.open})),h(PropertyCard,{p:properties[3],wide:true,open:props.open}))),
    h('div',{className:'collection-footer pad-x reveal'},h('a',{className:'text-link page-link',href:'collection.html'},'Enter the complete collection ',h('span',null,'↗')),h('p',null,'Private listings are shared',h('br'),'on qualified request.'))
  )}

  function Signature(props){
    var p=properties[4];
    return h('section',{className:'signature','data-scene-name':'Monarch Signature'},
      h('div',{className:'signature-media',style:{backgroundImage:"linear-gradient(90deg,rgba(11,11,9,.48),rgba(11,11,9,.08)),url('"+p.image+"')"}}),
      h('div',{className:'signature-shade'}),
      h('div',{className:'signature-copy pad-x'},
        h('p',{className:'eyebrow reveal'},'Monarch signature · MA-014'),
        h('h2',{className:'reveal'},'A home should change',h('br'),h('i',null,'how time feels.')),
        h('div',{className:'signature-meta reveal'},
          h('p',null,p.title,h('br'),p.location),
          h('p',null,'Designed by',h('br'),p.architect),
          h('p',null,'Completed',h('br'),p.year),
          h('button',{className:'round-link light magnetic',onClick:function(){props.open(p)}},h('span',null,'Enter',h('br'),'residence'),h('b',null,'↗'))
        )
      )
    );
  }

  function JournalCard(props){var j=props.j;return h('article',{className:'journal-card reveal',onClick:function(){props.open(j)},role:'button',tabIndex:0,onKeyDown:function(e){if(e.key==='Enter'||e.key===' ')props.open(j)}},
    h('div',{className:'journal-img'},h('img',{src:j.image,alt:j.title,loading:'lazy'}),h('span',{className:'journal-enter'},'Read ↗')),
    h('div',{className:'journal-meta'},h('span',null,j.meta),h('span',null,j.index)),h('h3',null,j.title),h('p',null,j.body))
  }

  function JournalRail(props){return h('section',{className:cx('journal pad-x',props.full&&'journal-full'),id:'journal','data-scene-name':'Field Notes'},h(SectionLabel,{n:props.n||'03'},'Field notes'),
    h('div',{className:'journal-top'},h('h2',{className:'reveal'},props.full?'Eight notes on': 'Architecture,',h('br'),props.full?h('i',null,'living well.'):[ 'place & ',h('i',{key:'i'},'ritual.')]),h('p',{className:'reveal'},props.full?'Architecture, collecting, place and the rituals that turn a residence into a life.':'Notes from the homes, makers and places shaping the way we want to live now.')),
    h('div',{className:'journal-drag-head'},h('p',null,'Selected reading / ',String(journal.length).padStart(2,'0')),h('div',{className:'drag-controls'},h('button',{className:'drag-arrow',onClick:function(e){var t=e.currentTarget.closest('.journal').querySelector('.journal-grid');t.scrollBy({left:-t.clientWidth*.72,behavior:'smooth'})},'aria-label':'Previous stories'},'←'),h('div',{className:'drag-status'},h('p',null,'Drag to explore'),h('i')),h('button',{className:'drag-arrow',onClick:function(e){var t=e.currentTarget.closest('.journal').querySelector('.journal-grid');t.scrollBy({left:t.clientWidth*.72,behavior:'smooth'})},'aria-label':'Next stories'},'→'))),
    h('div',{className:'journal-grid'},journal.map(function(j){return h(JournalCard,{key:j.id,j:j,open:props.open})})),
    !props.full&&h('div',{className:'rail-footer reveal'},h('a',{className:'text-link page-link',href:'journal.html'},'Open the full journal ',h('span',null,'↗')),h('span',null,'08 essays · updated seasonally'))
  )}

  function LocationCard(props){var l=props.l;return h('article',{className:cx('location-tile reveal',props.large&&'large'),onClick:function(){props.open(l)},role:'button',tabIndex:0,onKeyDown:function(e){if(e.key==='Enter'||e.key===' ')props.open(l)}},
    h('div',{className:'location-tile-media'},h('img',{src:l.image,alt:l.name,loading:'lazy'}),h('div',{className:'location-tile-shade'}),h('span',{className:'location-count'},l.count+' residences'),h('span',{className:'location-open'},'Explore ↗')),
    h('div',{className:'location-tile-copy'},h('span',null,l.tag),h('h3',null,l.name),h('p',null,l.country))
  )}

  function HomeLocations(props){return h('section',{className:'locations-showcase pad-x','data-scene-name':'Global Enclaves'},h(SectionLabel,{n:'04'},'Global enclaves'),
    h('div',{className:'locations-showcase-head'},h('h2',{className:'reveal'},'Places that feel',h('br'),h('i',null,'impossible to repeat.')),h('p',{className:'reveal'},'We follow architecture, privacy, culture and a particular quality of everyday life — not market noise.')),
    h('div',{className:'location-tile-grid'},locations.slice(0,4).map(function(l,i){return h(LocationCard,{key:l.id,l:l,open:props.open,large:i===0})})),
    h('div',{className:'rail-footer reveal'},h('a',{className:'text-link page-link',href:'locations.html'},'Explore all enclaves ',h('span',null,'↗')),h('span',null,'08 places · one private network'))
  )}

  function Concierge(props){
    return h('section',{className:'concierge pad-x','data-scene-name':'Private Representation'},
      h('div',{className:'concierge-line'}),
      h(SectionLabel,{n:props.n||'05'},'Private representation'),
      h('div',{className:'concierge-grid'},
        h('h2',{className:'reveal'},'Not a search.',h('br'),'A ',h('i',null,'conversation.')),
        h('div',{className:'concierge-right reveal'},
          h('p',null,'For clients seeking something specific, our private desk sources homes beyond the public market and coordinates every stage with complete discretion.'),
          h('button',{className:'button-primary magnetic',onClick:props.openInquiry},h('span',null,'Begin a private inquiry'),h('b',null,'↗'))
        )
      )
    );
  }

  function CollectionPage(props){return h(FragmentCompat,null,
    h(InnerHero,{kicker:'Private collection',lines:['Homes worth','crossing a border for.'],italic:1,deck:'A deliberately edited collection across coast, city, island and alpine landscapes.',image:properties[3].image,index:'01 / COLLECTION',scene:'Collection Opening'}),
    h('section',{className:'collection-intro pad-x','data-scene-name':'The Edit'},h(SectionLabel,{n:'01'},'The edit'),h('div',{className:'collection-intro-grid'},h('h2',{className:'reveal'},'Fewer homes.',h('br'),h('i',null,'More conviction.')),h('p',{className:'reveal'},'Every residence enters the collection for a reason: architecture, setting, provenance, privacy or a combination that simply cannot be recreated.'))),
    h(CollectionGrid,{filter:props.filter,setFilter:props.setFilter,open:props.open}),
    h(OffMarket,{openInquiry:props.openInquiry}),h(Concierge,{n:'04',openInquiry:props.openInquiry})
  )}

  function CollectionGrid(props){var cats=['all','coastal','city','retreat','alpine'];var filtered=properties.filter(function(p){return props.filter==='all'||p.category===props.filter});return h('section',{className:'collection-page pad-x','data-scene-name':'Residences'},
    h('div',{className:'collection-toolbar'},h('div',null,h('span',null,'Collection filter'),h('strong',null,String(filtered.length).padStart(2,'0')+' residences')),h('div',{className:'filters'},cats.map(function(f){return h('button',{key:f,className:props.filter===f?'active':'',onClick:function(){props.setFilter(f)}},f.charAt(0).toUpperCase()+f.slice(1))}))),
    h('div',{className:'collection-page-grid'},filtered.map(function(p,i){return h(PropertyCard,{key:p.id,p:p,open:props.open,featured:i===0&&props.filter==='all',wide:i===3})}))
  )}

  function OffMarket(props){return h('section',{className:'offmarket pad-x','data-scene-name':'Off Market'},h('div',{className:'offmarket-card reveal'},h('span',{className:'eyebrow'},'MONARCH / PRIVATE DESK'),h('h2',null,'The most interesting home',h('br'),h('i',null,'may never be listed.')),h('p',null,'A portion of our work happens privately: direct owner conversations, quiet mandates and properties shared only against a qualified brief.'),h('button',{className:'button-primary magnetic',onClick:props.openInquiry},h('span',null,'Open a confidential brief'),h('b',null,'↗'))))}

  function LocationsPage(props){return h(FragmentCompat,null,
    h(InnerHero,{kicker:'Global enclaves',lines:['A place is part','of the architecture.'],italic:1,deck:'Eight locations chosen for beauty, privacy, culture and the quality of an ordinary Tuesday.',image:locations[5].image,index:'02 / LOCATIONS',scene:'Enclaves Opening'}),
    h('section',{className:'place-philosophy pad-x','data-scene-name':'Our Compass'},h(SectionLabel,{n:'01'},'Our compass'),h('div',{className:'place-philosophy-grid'},h('h2',{className:'reveal'},'Not destinations.',h('br'),h('i',null,'Ways of living.')),h('div',{className:'reveal'},h('p',null,'Monarch follows places where landscape and culture shape daily life. We look for neighborhoods with identity, not simply addresses with recognition.'),h('div',{className:'mini-metrics'},h('span',null,h('strong',null,'08'), ' active enclaves'),h('span',null,h('strong',null,'34'), ' private relationships'))))),
    h('section',{className:'all-locations pad-x','data-scene-name':'The Enclaves'},h('div',{className:'location-tile-grid location-tile-grid-full'},locations.map(function(l,i){return h(LocationCard,{key:l.id,l:l,open:props.open,large:i===0||i===5})}))),
    h('section',{className:'location-method pad-x','data-scene-name':'Location Intelligence'},h(SectionLabel,{n:'03'},'Location intelligence'),h('div',{className:'location-method-grid'},[['01','Live there first','We look beyond peak-season impressions and test the place as a life, not a holiday.'],['02','Study the supply','Scarcity, planning, architecture and future development matter more than headlines.'],['03','Build local trust','The strongest opportunities usually arrive through long-standing local relationships.']].map(function(x){return h('article',{className:'method-card reveal',key:x[0]},h('span',null,x[0]),h('h3',null,x[1]),h('p',null,x[2]))}))),
    h(Concierge,{n:'04',openInquiry:props.openInquiry})
  )}

  function JournalPage(props){return h(FragmentCompat,null,
    h(InnerHero,{kicker:'Monarch journal',lines:['Notes on homes,','places & ritual.'],italic:1,deck:'An editorial record of the architecture, makers and private geographies that shape how we want to live.',image:journal[0].image,index:'03 / JOURNAL',scene:'Journal Opening'}),
    h('section',{className:'journal-feature pad-x','data-scene-name':'Current Issue'},h(SectionLabel,{n:'01'},'Current issue'),h('div',{className:'journal-feature-grid reveal',onClick:function(){props.open(journal[0])},role:'button',tabIndex:0},h('div',{className:'journal-feature-media'},h('img',{src:journal[0].image,alt:journal[0].title})),h('div',{className:'journal-feature-copy'},h('span',null,journal[0].meta),h('h2',null,journal[0].title),h('p',null,journal[0].body),h('b',null,'Read the story ↗')))),
    h(JournalRail,{full:true,n:'02',open:props.open}),
    h('section',{className:'journal-closing pad-x','data-scene-name':'Editorial Desk'},h('div',{className:'journal-closing-grid'},h('h2',{className:'reveal'},'A quieter inbox.'),h('div',{className:'reveal'},h('p',null,'Occasional notes on remarkable homes, architecture and places worth knowing.'),h('form',{onSubmit:function(e){e.preventDefault();e.currentTarget.classList.add('sent')}},h('input',{type:'email',required:true,placeholder:'Email address'}),h('button',null,'Join the journal ↗'),h('small',null,'Thank you. Your concept subscription is noted.')))))
  )}

  function ServiceCard(props){var s=props.s;return h('article',{className:'service-card reveal',onClick:function(){props.open(s)},role:'button',tabIndex:0,onKeyDown:function(e){if(e.key==='Enter'||e.key===' ')props.open(s)}},h('span',null,s.index),h('h3',null,s.title),h('p',null,s.summary),h('b',null,'Open service ↗'))}
  function AdvisorCard(props){var a=props.a;return h('article',{className:'advisor-card reveal',onClick:function(){props.open(a)},role:'button',tabIndex:0,onKeyDown:function(e){if(e.key==='Enter'||e.key===' ')props.open(a)}},h('div',{className:'advisor-monogram'},a.initials),h('span',null,a.role),h('h3',null,a.name),h('p',null,a.base),h('b',null,'Meet advisor ↗'))}

  function HousePage(props){return h(FragmentCompat,null,
    h(InnerHero,{kicker:'Our house',lines:['Private by design.','Personal by nature.'],italic:0,deck:'Monarch is a small international advisory for people who care as much about architecture and atmosphere as they do about address.',image:properties[1].image,index:'04 / OUR HOUSE',scene:'House Opening'}),
    h(Manifesto),
    h('section',{className:'services pad-x','data-scene-name':'How We Work'},h(SectionLabel,{n:'02'},'How we work'),h('div',{className:'services-head'},h('h2',{className:'reveal'},'One relationship.',h('br'),h('i',null,'Every moving part.')),h('p',{className:'reveal'},'Acquisition, representation and the network around a home — handled with one standard of discretion.')),h('div',{className:'services-grid'},services.map(function(s){return h(ServiceCard,{key:s.id,s:s,open:props.openService})}))),
    h('section',{className:'advisors pad-x','data-scene-name':'Private Advisors'},h(SectionLabel,{n:'03'},'Private advisors'),h('div',{className:'advisors-head'},h('h2',{className:'reveal'},'A small table,',h('br'),h('i',null,'not a sales floor.')),h('p',{className:'reveal'},'Every client relationship is led by a senior advisor with direct access to our local network.')),h('div',{className:'advisor-grid'},advisors.map(function(a){return h(AdvisorCard,{key:a.id,a:a,open:props.openAdvisor})}))),
    h('section',{className:'process pad-x','data-scene-name':'The Process'},h(SectionLabel,{n:'04'},'The process'),h('div',{className:'process-grid'},[['01','Listen','We define what cannot be compromised.'],['02','Curate','We remove the noise before it reaches you.'],['03','Enter','Viewings are paced around understanding, not urgency.'],['04','Represent','Negotiation and completion stay discreet and coordinated.']].map(function(x){return h('div',{className:'process-step reveal',key:x[0]},h('span',null,x[0]),h('h3',null,x[1]),h('p',null,x[2]))}))),
    h(Concierge,{n:'05',openInquiry:props.openInquiry})
  )}

  function HomePage(props){return h(FragmentCompat,null,h(HomeHero),h(Manifesto),h(FeaturedCollection,{open:props.openProperty}),h(Signature,{open:props.openProperty}),h(JournalRail,{open:props.openArticle}),h(HomeLocations,{open:props.openLocation}),h(Concierge,{n:'05',openInquiry:props.openInquiry}))}

  function Footer(){return h('footer',{className:'footer pad-x'},h('div',{className:'footer-top'},h('div',{className:'footer-brand'},h('p',null,'Private estates · globally represented'),h('h2',null,'MONARCH')),h('div',{className:'footer-links'},h('div',null,h('span',null,'Discover'),h('a',{className:'page-link',href:'collection.html'},'Private collection'),h('a',{className:'page-link',href:'journal.html'},'Field notes'),h('a',{className:'page-link',href:'locations.html'},'Global enclaves')),h('div',null,h('span',null,'House'),h('a',{className:'page-link',href:'house.html'},'Our approach'),h('button',{className:'footer-button','data-open-inquiry':'1'},'Private desk'),h('a',{className:'page-link',href:'house.html'},'Representation')))),h('div',{className:'footer-bottom'},h('span',null,'© 2026 Monarch Private Estates · Concept experience'),h('div',null,h('a',{href:'#'},'Instagram'),h('a',{href:'#'},'Privacy'),h('a',{href:'#'},'Terms'))))}

  function ModalShell(props){
    return h('div',{className:'modal-shell modal-enter',onMouseDown:function(e){if(e.target===e.currentTarget)props.close()}},
      h('button',{className:'modal-close',onClick:props.close,'aria-label':'Close'},'×'),
      props.children
    );
  }

  function PropertyModal(props){
    var p=props.p;if(!p)return null;
    return h(ModalShell,{close:props.close},
      h('div',{className:'property-modal luxury-dossier'},
        h('div',{className:'property-modal-media',style:{backgroundImage:"linear-gradient(0deg,rgba(0,0,0,.13),transparent),url('"+p.image+"')"}}),
        h('div',{className:'property-modal-content'},
          h('div',{className:'property-modal-top'},h('span',null,p.location),h('span',null,'MPE–'+p.number)),
          h('h2',{className:'modal-title'},p.title),
          h('p',{className:'modal-intro'},p.intro),
          h('div',{className:'modal-specs'},
            h('div',null,h('strong',null,p.beds),h('span',null,'Bedrooms')),
            h('div',null,h('strong',null,p.area),h('span',null,'Interior m²')),
            h('div',null,h('strong',null,p.shortPrice),h('span',null,'Guide price'))
          ),
          h('div',{className:'dossier-grid'},
            h('div',null,h('span',null,'Architect'),h('strong',null,p.architect)),
            h('div',null,h('span',null,'Completed'),h('strong',null,p.year)),
            h('div',null,h('span',null,'Status'),h('strong',null,p.status))
          ),
          h('p',{className:'modal-note'},p.note),
          h('div',{className:'feature-list'},p.features.map(function(f){return h('span',{key:f},f)})),
          h('button',{className:'button-primary',onClick:props.openInquiry},h('span',null,'Request private dossier'),h('b',null,'↗'))
        )
      )
    );
  }

  function LocationModal(props){
    var l=props.l;if(!l)return null;
    return h(ModalShell,{close:props.close},
      h('div',{className:'info-modal location-modal'},
        h('div',{className:'info-modal-media'},h('img',{src:l.image,alt:l.name})),
        h('div',{className:'info-modal-content'},
          h('p',{className:'eyebrow'},l.tag+' · '+l.country),h('h2',null,l.name),
          h('p',{className:'info-lead'},l.essence),h('p',null,l.lifestyle),
          h('div',{className:'info-metrics'},
            h('div',null,h('span',null,'Private collection'),h('strong',null,l.count+' residences')),
            h('div',null,h('span',null,'Best season'),h('strong',null,l.best)),
            h('div',null,h('span',null,'Access'),h('strong',null,l.access))
          ),
          h('div',{className:'feature-list'},l.highlights.map(function(x){return h('span',{key:x},x)})),
          h('div',{className:'modal-actions'},
            h('a',{className:'button-secondary page-link',href:'collection.html'},'View collection ↗'),
            h('button',{className:'button-primary',onClick:props.openInquiry},h('span',null,'Ask about '+l.name),h('b',null,'↗'))
          )
        )
      )
    );
  }

  function ArticleModal(props){
    var j=props.j;if(!j)return null;
    return h(ModalShell,{close:props.close},
      h('article',{className:'info-modal article-modal'},
        h('div',{className:'info-modal-media'},h('img',{src:j.image,alt:j.title})),
        h('div',{className:'info-modal-content'},
          h('p',{className:'eyebrow'},j.meta+' · '+j.index),h('h2',null,j.title),
          h('p',{className:'info-lead'},j.body),
          j.story.map(function(p,i){return h('p',{key:i},p)}),
          h('div',{className:'article-signoff'},h('span',null,'MONARCH JOURNAL'),h('span',null,'Issue 01 / 2026'))
        )
      )
    );
  }

  function AdvisorModal(props){
    var a=props.a;if(!a)return null;
    return h(ModalShell,{close:props.close},
      h('div',{className:'small-info-modal'},
        h('div',{className:'small-info-monogram'},a.initials),h('p',{className:'eyebrow'},a.role),
        h('h2',null,a.name),h('span',{className:'small-info-base'},a.base),h('p',null,a.bio),
        h('div',{className:'feature-list'},a.specialties.map(function(s){return h('span',{key:s},s)})),
        h('button',{className:'button-primary',onClick:props.openInquiry},h('span',null,'Speak with '+a.name.split(' ')[0]),h('b',null,'↗'))
      )
    );
  }

  function ServiceModal(props){
    var s=props.s;if(!s)return null;
    return h(ModalShell,{close:props.close},
      h('div',{className:'small-info-modal'},
        h('span',{className:'service-modal-index'},s.index),h('p',{className:'eyebrow'},'Monarch private services'),
        h('h2',null,s.title),h('p',{className:'info-lead'},s.summary),h('p',null,s.detail),
        h('button',{className:'button-primary',onClick:props.openInquiry},h('span',null,'Discuss this service'),h('b',null,'↗'))
      )
    );
  }

  function InquiryModal(props){
    return h(ModalShell,{close:props.close},
      h('div',{className:'inquiry-modal'},
        h('div',{className:'inquiry-panel'},
          h('p',{className:'eyebrow'},'Monarch private desk'),h('h2',null,'Tell us what',h('br'),h('i',null,'you are seeking.')),
          h('p',null,'Share as much or as little as you wish. A private advisor would normally respond personally.'),
          !props.sent ? h('form',{onSubmit:function(e){e.preventDefault();props.setSent(true)}},
            h('div',{className:'form-row'},
              h('label',null,h('span',null,'Full name'),h('input',{required:true,placeholder:'Your name'})),
              h('label',null,h('span',null,'Email'),h('input',{required:true,type:'email',placeholder:'you@example.com'}))
            ),
            h('div',{className:'form-row'},
              h('label',null,h('span',null,'Preferred location'),h('input',{placeholder:'Marbella, London, anywhere'})),
              h('label',null,h('span',null,'Indicative budget'),h('select',{defaultValue:''},
                h('option',{value:'',disabled:true},'Select range'),h('option',null,'€3M — €7M'),h('option',null,'€7M — €15M'),h('option',null,'€15M — €30M'),h('option',null,'€30M+')
              ))
            ),
            h('label',null,h('span',null,'What matters most?'),h('textarea',{rows:4,placeholder:'Architecture, privacy, water, city access…'})),
            h('button',{className:'button-primary'},h('span',null,'Send private inquiry'),h('b',null,'↗')),
            h('small',null,'Concept form — no data is transmitted.')
          ) : h('div',{className:'form-success'},h('span',null,'✓'),h('h3',null,'Received, quietly.'),h('p',null,'Your concept inquiry has been staged successfully.'),h('button',{className:'text-link light-link',onClick:props.close},'Return to Monarch ↗'))
        )
      )
    );
  }

  class App extends React.Component{
    constructor(props){super(props);this.state={menu:false,filter:'all',property:null,location:null,article:null,advisor:null,service:null,inquiry:false,sent:false};this.openInquiry=this.openInquiry.bind(this);this.onKey=this.onKey.bind(this);this.footerInquiry=this.footerInquiry.bind(this)}
    componentDidMount(){window.addEventListener('keydown',this.onKey);document.addEventListener('click',this.footerInquiry);this.unlock()}
    componentDidUpdate(){this.unlock()}
    componentWillUnmount(){window.removeEventListener('keydown',this.onKey);document.removeEventListener('click',this.footerInquiry);this.unlock()}
    footerInquiry(e){if(e.target&&e.target.closest&&e.target.closest('[data-open-inquiry]'))this.openInquiry()}
    unlock(){document.body.classList.remove('modal-open');document.body.style.overflow='';document.documentElement.style.overflow=''}
    onKey(e){if(e.key==='Escape')this.setState({property:null,location:null,article:null,advisor:null,service:null,inquiry:false,menu:false})}
    openInquiry(){this.setState({property:null,location:null,article:null,advisor:null,service:null,menu:false,inquiry:true,sent:false})}
    closeAll(){this.setState({property:null,location:null,article:null,advisor:null,service:null,inquiry:false})}
    render(){var self=this,s=this.state,page=document.body.getAttribute('data-page')||'home';var common={openInquiry:this.openInquiry};var content;
      if(page==='collection')content=h(CollectionPage,{filter:s.filter,setFilter:function(f){self.setState({filter:f})},open:function(p){self.setState({property:p})},openInquiry:this.openInquiry});
      else if(page==='locations')content=h(LocationsPage,{open:function(l){self.setState({location:l})},openInquiry:this.openInquiry});
      else if(page==='journal')content=h(JournalPage,{open:function(j){self.setState({article:j})}});
      else if(page==='house')content=h(HousePage,{openInquiry:this.openInquiry,openAdvisor:function(a){self.setState({advisor:a})},openService:function(v){self.setState({service:v})}});
      else content=h(HomePage,{openProperty:function(p){self.setState({property:p})},openArticle:function(j){self.setState({article:j})},openLocation:function(l){self.setState({location:l})},openInquiry:this.openInquiry});
      return h('div',{className:'app-shell'},h('div',{className:'noise'}),h('div',{className:'page-transition','aria-hidden':'true'},h('span',null,'MONARCH')),h('div',{className:'loader'},h('div',{className:'loader-mark'},'M'),h('div',{className:'loader-line'},h('i')),h('p',null,'Private Estates')),h('div',{className:'scroll-progress'}),h(Header,{page:page,openInquiry:this.openInquiry,menu:s.menu,toggleMenu:function(){self.setState({menu:!s.menu})}}),h('main',null,content),h(Footer),s.property&&h(PropertyModal,{p:s.property,close:function(){self.setState({property:null})},openInquiry:this.openInquiry}),s.location&&h(LocationModal,{l:s.location,close:function(){self.setState({location:null})},openInquiry:this.openInquiry}),s.article&&h(ArticleModal,{j:s.article,close:function(){self.setState({article:null})}}),s.advisor&&h(AdvisorModal,{a:s.advisor,close:function(){self.setState({advisor:null})},openInquiry:this.openInquiry}),s.service&&h(ServiceModal,{s:s.service,close:function(){self.setState({service:null})},openInquiry:this.openInquiry}),s.inquiry&&h(InquiryModal,{sent:s.sent,setSent:function(v){self.setState({sent:v})},close:function(){self.setState({inquiry:false})}}))
    }
  }

  try{
    ReactDOM.render(h(App),document.getElementById('root'));
  }catch(renderError){
    console.error('Monarch render error:',renderError);
    var root=document.getElementById('root');
    if(root)root.innerHTML='<div class="boot-fallback"><span>MONARCH</span><h1>Private Estates</h1><p>The interface could not initialize. Refresh the page once or reopen the local server.</p></div>';
  }

  function bootCinema(){
    var loader=document.querySelector('.loader');window.setTimeout(function(){if(loader)loader.classList.add('is-done')},760);
    var revealObserver=null;
    function observeReveals(){
      var els=[].slice.call(document.querySelectorAll('.reveal:not(.revealed)'));
      if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('revealed')});return}
      if(!revealObserver)revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('revealed');revealObserver.unobserve(entry.target)}})},{threshold:.1,rootMargin:'0px 0px -6% 0px'});
      els.forEach(function(el){revealObserver.observe(el)});
    }
    observeReveals();
    if('MutationObserver' in window){new MutationObserver(observeReveals).observe(document.getElementById('root'),{childList:true,subtree:true})}

    var progress=document.querySelector('.scroll-progress'),hero=document.querySelector('.hero-media'),heroSection=document.querySelector('.hero'),header=document.querySelector('.site-header'),brand=document.querySelector('.brand'),ticking=false;
    function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
    function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(function(){var y=window.pageYOffset||0,max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);if(progress)progress.style.transform='scaleX('+(y/max)+')';if(hero)hero.style.transform='translate3d(0,'+(Math.min(y*.1,100))+'px,0) scale('+(1.06+Math.min(y/max,.05))+')';if(header){var heroH=heroSection?Math.max(heroSection.offsetHeight,window.innerHeight):window.innerHeight*.75;var lp=clamp((y-heroH*.48)/(heroH*.28),0,1);header.classList.toggle('scrolled',y>24);header.classList.toggle('past-hero',lp>.92);header.style.setProperty('--logo-progress',lp.toFixed(3));if(brand)brand.style.setProperty('--logo-progress',lp.toFixed(3))}ticking=false})}
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
    document.addEventListener('pointermove',function(e){var heroEl=document.querySelector('.hero');if(!heroEl||window.innerWidth<900)return;heroEl.style.setProperty('--mx',((e.clientX/window.innerWidth-.5)*12)+'px');heroEl.style.setProperty('--my',((e.clientY/window.innerHeight-.5)*8)+'px')},{passive:true});
    document.addEventListener('mousemove',function(e){var btn=e.target.closest&&e.target.closest('.magnetic');if(!btn)return;var r=btn.getBoundingClientRect();btn.style.setProperty('--bx',((e.clientX-r.left-r.width/2)*.12)+'px');btn.style.setProperty('--by',((e.clientY-r.top-r.height/2)*.12)+'px')});
    document.addEventListener('mouseout',function(e){var btn=e.target.closest&&e.target.closest('.magnetic');if(btn){btn.style.setProperty('--bx','0px');btn.style.setProperty('--by','0px')}});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootCinema);else bootCinema();
})();
