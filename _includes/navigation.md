{%- for link in site.data.navigation.main -%}
<a class="nav-link" href="{{ link.url }}">{{ link.title }}</a>
{%- endfor -%}
